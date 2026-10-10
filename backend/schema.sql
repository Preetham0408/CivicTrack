-- Run in the civictrack database AFTER your base schema creates departments and locations.
CREATE TABLE IF NOT EXISTS public_works_projects (
 id BIGSERIAL PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 description TEXT,
 project_type VARCHAR(100),
 department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
 location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
 status VARCHAR(30) NOT NULL DEFAULT 'planned' CHECK(status IN ('planned','in_progress','delayed','completed','cancelled')),
 progress_percent NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK(progress_percent BETWEEN 0 AND 100),
 budget_amount NUMERIC(14,2),
 planned_start DATE,
 planned_end DATE,
 contractor_name VARCHAR(200),
 public_contact VARCHAR(200),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public_works_projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_department ON public_works_projects(department_id);
