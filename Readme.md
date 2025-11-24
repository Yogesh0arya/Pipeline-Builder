# 🚀 VectorShift Pipeline Builder — Technical Assessment Project

This project implements a fully functional, dark-themed **Pipeline Builder Application**, built for the **VectorShift Frontend Technical Assessment**.

It uses:

- **React + React Flow** for the pipeline UI
- **Zustand** for global state management
- **FastAPI (Python)** for backend validation & DAG analysis

---

## ✨ Key Features Implemented

This solution covers **all four assessment parts**, with extra UX enhancements.

---

## **1. Node Abstraction & Styling (Parts 1 & 2)**

### **✔ Node Abstraction (`BaseNode.js`)**

A single abstract component handles:

- Common structure
- Dark theme styling
- Default output handles
- Header/title layout

This makes new node creation efficient and scalable.

### **✔ Custom Node Types Added**

Five fully functional nodes demonstrate abstraction flexibility:

- **Split Text**
- **Join Text**
- **Image Generator**
- **Filter List**
- **Data Source**

### **✔ Unified Dark Theme**

A clean modern UI applied to:

- Toolbar
- Canvas
- Nodes
- MiniMap

---

## **2. Dynamic Text Node Logic (Part 3)**

The `TextNode` includes advanced dynamic behavior:

### **📝 Auto-Sizing**

The textarea expands **in width and height** based on user input.

### **🧩 Dynamic Handles**

When the user types:

A **Target Handle** is automatically added for that variable, enabling connections from other nodes.

---

## **3. Backend Integration & DAG Validation (Part 4)**

Pipeline submission triggers detailed backend validation.

### **🔗 Pipeline Submission**

Sends the entire `{ nodes, edges }` as JSON to the backend.

### **⚙ FastAPI Endpoint (`/pipelines/parse`) Returns:**

- **num_nodes** → Total nodes
- **num_edges** → Valid connected edges
- **is_dag** → Whether the graph is a Directed Acyclic Graph

### **🚫 Orphan Edge Handling**

Edges referencing deleted nodes are **ignored**, ensuring clean, correct validation.

---

## **4. Quality-of-Life Enhancements**

These features improve overall UX:

### ✔ Click-to-Add Nodes

Nodes can be added via **drag** or via **single-click**.

### ✔ Edge Deletion UI

Each edge includes a **small delete button** for quick removal.

### ✔ Node Deletion

Nodes feature a clear **top-right delete icon**.

---

# 🏗 Architecture Overview

| Component       | Technology         | Role                              |
| --------------- | ------------------ | --------------------------------- |
| **Frontend UI** | React, React Flow  | Visual pipeline builder           |
| **State Store** | Zustand            | Global state for nodes & edges    |
| **Backend API** | FastAPI (Python)   | `/pipelines/parse` validation     |
| **Graph Logic** | Python (DFS)       | Cycle detection & DAG validation  |

---

# ⚙️ Setup & Installation

## **A. Frontend Setup**

```bash
cd frontend
npm install
npm start
```

Runs on:
👉 http://localhost:3000

## **B. Backend Setup**

Navigate to the `/backend` directory.

```bash
cd ../backend

pip install fastapi uvicorn

python -m uvicorn main:app --reload
```

# 🚀 Usage

- Ensure both the Frontend (npm start) and Backend (uvicorn...) servers are running.

- Open http://localhost:3000 in your browser.

- Build a pipeline by dragging nodes or clicking them in the toolbar.

- Experiment with the Text Node: Type {{test}} to see a new input handle appear.

- To validate the graph, click the Submit Pipeline button. An alert will display the node count, edge count, and the is_dag status.

- Test the DAG check by creating a cycle (e.g., connect Node A to Node B, and Node B back to Node A) and submitting the pipeline. The result should show is_dag: No.
