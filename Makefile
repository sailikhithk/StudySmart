.PHONY: setup activate install create_db run

# Step 1: Create a virtual environment
setup:
	python -m venv venv

# Step 2: Activate the virtual environment
activate:
	.\venv\Scripts\activate

# Step 3: Install the required packages
install:
	pip install -r requirements.txt

# Step 4: Create the database tables
create_db:
	python create_db.py
	python compare_schemas.py
	python insert_dummy_data.py

# Step 5: Run the FastAPI application
run:
	python run.py

# Combine all steps
all: setup activate install create_db run

tree_windows:
	tree /F /A | findstr /V /C:"venv\\" | findstr /V /C:".pyc" | findstr /V /C:".DS_Store" | findstr /V /C:"__pycache__" > backend_directory_tree.txt


run:
	venv\Scripts\activate
	uvicorn app.main:app --reload

aider:
nano ~/.aider.conf.yml
