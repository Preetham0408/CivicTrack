require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = Number(process.env.PORT || 5000);
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false });

app.get("/", (_req,res)=>res.json({message:"Welcome to CivicTrack API"}));
app.get("/api/health", async (_req,res)=>{
  try { await pool.query("SELECT 1"); res.json({status:"ok",database:"connected"}); }
  catch(e) { res.status(503).json({status:"error",database:"unavailable",detail:e.message}); }
});
app.get("/api/departments", async (_req,res,next)=>{
  try { res.json((await pool.query("SELECT id,name FROM departments ORDER BY name")).rows); } catch(e){next(e);}
});
app.get("/api/projects", async (req,res,next)=>{
  try {
    const where=[], vals=[];
    const add=(clause,value)=>{ vals.push(value); where.push(clause.replace("?",`$${vals.length}`)); };
    if(req.query.status) add("p.status = ?",req.query.status);
    if(req.query.department_id) add("p.department_id = ?",Number(req.query.department_id));
    if(req.query.city) add("l.city ILIKE ?",`%${req.query.city}%`);
    if(req.query.ward_number) add("l.ward_number = ?",Number(req.query.ward_number));
    if(req.query.search){vals.push(`%${req.query.search}%`);where.push(`(p.title ILIKE $${vals.length} OR COALESCE(p.description,'') ILIKE $${vals.length})`);}
    const limit=Math.min(Math.max(parseInt(req.query.limit||"20",10)||20,1),100);
    const offset=Math.max(parseInt(req.query.offset||"0",10)||0,0);
    vals.push(limit,offset);
    const sql=`SELECT p.*,d.name AS department_name,l.city,l.ward_number FROM public_works_projects p LEFT JOIN departments d ON d.id=p.department_id LEFT JOIN locations l ON l.id=p.location_id ${where.length?"WHERE "+where.join(" AND "):""} ORDER BY p.created_at DESC LIMIT $${vals.length-1} OFFSET $${vals.length}`;
    res.json({data:(await pool.query(sql,vals)).rows,limit,offset});
  } catch(e){next(e);}
});
app.get("/api/projects/:id", async (req,res,next)=>{
  try {
    const r=await pool.query("SELECT p.*,d.name AS department_name,l.city,l.ward_number FROM public_works_projects p LEFT JOIN departments d ON d.id=p.department_id LEFT JOIN locations l ON l.id=p.location_id WHERE p.id=$1",[Number(req.params.id)]);
    if(!r.rowCount) return res.status(404).json({error:"Project not found"});
    res.json(r.rows[0]);
  } catch(e){next(e);}
});
app.post("/api/projects", async (req,res,next)=>{
  try {
    const b=req.body;
    if(!b.title || typeof b.title!=="string" || !b.title.trim()) return res.status(400).json({error:"title is required"});
    const status=b.status||"planned";
    if(!["planned","in_progress","delayed","completed","cancelled"].includes(status)) return res.status(400).json({error:"Invalid status"});
    const progress=Number(b.progress_percent??0);
    if(!Number.isFinite(progress)||progress<0||progress>100) return res.status(400).json({error:"progress_percent must be between 0 and 100"});
    const values=[b.title.trim(),b.description??null,b.project_type??null,b.department_id??null,b.location_id??null,status,progress,b.budget_amount??null,b.planned_start??null,b.planned_end??null,b.contractor_name??null,b.public_contact??null];
    const r=await pool.query("INSERT INTO public_works_projects (title,description,project_type,department_id,location_id,status,progress_percent,budget_amount,planned_start,planned_end,contractor_name,public_contact) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",values);
    res.status(201).json(r.rows[0]);
  } catch(e){next(e);}
});
app.patch("/api/projects/:id", async (req,res,next)=>{
  try {
    const allowed=["title","description","project_type","department_id","location_id","status","progress_percent","budget_amount","planned_start","planned_end","contractor_name","public_contact"];
    const entries=Object.entries(req.body).filter(([k])=>allowed.includes(k));
    if(!entries.length) return res.status(400).json({error:"Provide at least one supported field"});
    if(req.body.progress_percent!==undefined && (!Number.isFinite(Number(req.body.progress_percent))||Number(req.body.progress_percent)<0||Number(req.body.progress_percent)>100)) return res.status(400).json({error:"progress_percent must be between 0 and 100"});
    const vals=entries.map(([,v])=>v), set=entries.map(([k],i)=>`${k}=$${i+1}`).join(", ");
    vals.push(Number(req.params.id));
    const r=await pool.query(`UPDATE public_works_projects SET ${set},updated_at=NOW() WHERE id=$${vals.length} RETURNING *`,vals);
    if(!r.rowCount) return res.status(404).json({error:"Project not found"});
    res.json(r.rows[0]);
  } catch(e){next(e);}
});
app.get("/api/dashboard/summary",async (_req,res,next)=>{
  try { res.json((await pool.query("SELECT COUNT(*)::int AS total_projects,COUNT(*) FILTER (WHERE status='delayed')::int AS delayed_projects,COALESCE(ROUND(AVG(progress_percent)::numeric,1),0) AS average_progress,COALESCE(SUM(budget_amount),0) AS total_budget FROM public_works_projects")).rows[0]); } catch(e){next(e);}
});
app.use((e,_req,res,_next)=>{console.error(e);res.status(500).json({error:"Internal server error"});});
app.listen(port,()=>console.log(`CivicTrack API running at http://localhost:${port}`));
