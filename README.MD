# VectorShift - Visual Pipeline Builder

## Project Overview

VectorShift is a powerful visual pipeline builder that enables users to create, manage, and execute data processing workflows through an intuitive drag-and-drop interface. Built with React and FastAPI, this tool simplifies complex data workflows into manageable visual components.

## Project Structure

```
VectorShift/
├── frontend/               # React frontend application
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── components/    # Reusable UI components
│       ├── nodes/         # Node components (Text, File, Concatenate, etc.)
│       ├── layouts/       # Application layouts
│       ├── store/         # State management
│       └── utils/         # Helper functions
└── backend/              # FastAPI backend
    ├── main.py          # API endpoints
    └── requirements.txt # Python dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)
- Python 3.8+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd VectorShift
   ```

2. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Set up the backend**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## Key Features

### 1. Node-Based Pipeline Editor
- Intuitive drag-and-drop interface
- Visual representation of data flows
- Real-time preview of node outputs

### 2. Available Node Types
- **Text Node**: For text input and manipulation
- **File Node**: Handles file uploads and processing
- **Concatenate Node**: Combines multiple text inputs with custom separators
- **OpenAI Node**: Integration with OpenAI's language models
- **Text to File Node**: Saves processed text to files

### 3. Interactive Features
- Dynamic node resizing
- Real-time data validation
- Visual feedback for node connections
- Responsive design for various screen sizes

## Backend Integration

The frontend communicates with the FastAPI backend to process pipeline executions. The API handles:
- Pipeline validation
- Node execution
- Data transformation
- Error handling

### API Endpoints

#### Execute Pipeline
```http
POST /pipelines/execute
```

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "node1",
      "type": "text",
      "data": { "text": "Hello, World!" }
    }
  ],
  "edges": []
}
```

**Response:**
```json
{
  "status": "success",
  "results": {
    "node1": "Hello, World!"
  }
}
```

## Technologies Used

### Frontend
- React 18
- React Flow (for node-based editor)
- TailwindCSS (styling)
- Zustand (state management)
- Axios (HTTP client)

### Backend
- FastAPI
- Python 3.8+
- Uvicorn (ASGI server)
- Pydantic (data validation)

## Development

### Available Scripts
- `npm start`: Start development server
- `npm test`: Run tests
- `npm run build`: Create production build
- `npm run lint`: Check code quality

## Future Enhancements

- Add more node types for advanced data processing
- Implement pipeline versioning and history
- Add user authentication and project management
- Enable real-time collaboration
- Enhance error handling and validation
- Add comprehensive test coverage

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
