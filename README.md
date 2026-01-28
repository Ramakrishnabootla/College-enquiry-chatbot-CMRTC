# CMR Technical Campus Chatbot 🤖

A sophisticated AI-powered chatbot designed to provide information and assistance for CMR Technical Campus, built with modern web technologies and machine learning capabilities.

## 🌟 Features

- **Intelligent Query Processing**: Advanced NLP-based intent classification
- **Spelling Correction**: Automatic spelling error detection and correction
- **Contextual Responses**: Dynamic responses based on user queries
- **Smart Greetings**: Timezone-aware personalized greetings
- **Modern UI**: Beautiful, responsive React-based frontend
- **Real-time Communication**: FastAPI backend with WebSocket support
- **Multi-language Support**: Built-in language processing capabilities

## 🏗️ Architecture


### Backend (Python/FastAPI)
- **FastAPI**: High-performance web framework
- **Machine Learning Models**: Custom sequence-to-vector and vector-to-class models
- **NLP Processing**: Natural language understanding and intent classification
- **Spelling Correction**: Advanced text correction algorithms
- **CORS Support**: Cross-origin resource sharing enabled

### Frontend (React.js)
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **FontAwesome**: Rich icon library
- **Responsive Design**: Mobile-first approach
- **Speech Integration**: Text-to-speech capabilities

## 📁 Project Structure

```
chatbot/
├── LICENSE                 # MIT License
├── backend/               # Python backend
│   ├── app/              # FastAPI application
│   │   ├── app.py       # Main application file
│   │   ├── greetings.py # Greeting logic
│   │   └── spelling_fix.py # Spelling correction
│   ├── models/          # ML models
│   │   ├── interpreter.py # Main interpreter
│   │   ├── sequence_to_vector/ # Seq2Vec models
│   │   ├── vector_to_class/   # Vec2Class models
│   │   └── saved/       # Trained model files
│   ├── data/            # Training data and responses
│   │   ├── data.py      # Data processing logic
│   │   ├── responses.json # Response templates
│   │   ├── intends.json # Intent definitions
│   │   ├── related.json # Related information
│   │   ├── querys.json  # Query examples
│   │   ├── cutoff.json  # Cutoff data
│   │   ├── raw_data.json # Raw training data
│   │   └── generate_data.py # Data generation scripts
│   ├── tests/           # Test files
│   ├── config.json      # Configuration file
│   ├── config.py        # Config loader
│   ├── requirements.txt # Python dependencies
│   ├── requirements.py  # Requirements checker
│   ├── setup_model.py   # Model setup script
│   ├── retrain_model.py # Model retraining script
│   ├── copy_model.py    # Model copying utility
│   ├── main.py          # Main entry point
│   └── .gitignore       # Git ignore rules
├── frontend/            # React frontend
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   │   ├── chatbox/ # Chat interface
│   │   │   ├── chat/   # Chat functionality
│   │   │   └── info/   # Information display
│   │   ├── api/        # API integration
│   │   ├── App.jsx     # Main application
│   │   ├── App.css     # Main styles
│   │   ├── index.css   # Global styles
│   │   └── index.js    # Entry point
│   ├── public/         # Static assets
│   ├── package.json    # Node.js dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   ├── postcss.config.js # PostCSS configuration
│   └── .gitignore      # Git ignore rules
└── data/               # Additional data files
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd chatbot/backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the backend server:**
   ```bash
   python -m uvicorn app.app:__app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd chatbot/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## ⚙️ Configuration

The chatbot can be configured through `backend/config.json`:

```json
{
    "embedding": 15,
    "sequence_to_vector": {
        "window": 10,
        "epochs": 500,
        "tokenization": "stem",
        "learning_rate": 0.001,
        "batch_size": 128
    },
    "vector_to_class": {
        "epochs": 1000,
        "learning_rate": 0.001,
        "batch_size": 128
    }
}
```

## 🔧 API Endpoints

### Query Processing
- `GET /query/{q}` - Process user queries and return responses
- `GET /direct/{klass}` - Get direct responses for specific intent classes

### Response Format
```json
{
    "status": 200,
    "message": "Response text",
    "related": ["related information"]
}
```

## 🧠 Machine Learning Models

### Sequence to Vector (Seq2Vec)
- Converts text sequences to numerical vectors
- Configurable window size and training parameters
- Supports multiple tokenization strategies

### Vector to Class (Vec2Class)
- Neural network-based intent classification
- Configurable network architecture
- Optimized for educational domain queries

### Model Management
- **Setup**: Use `setup_model.py` for initial model configuration
- **Training**: Use `retrain_model.py` for model retraining
- **Copying**: Use `copy_model.py` for model backup/restore

## 🎨 Customization

### Adding New Responses
1. Edit `backend/data/responses.json`
2. Add new intent categories and responses
3. Update `backend/data/intends.json` if needed
4. Retrain the models using `retrain_model.py`

### Styling Changes
1. Modify `frontend/src/App.css`
2. Update Tailwind classes in components
3. Customize color schemes and layouts
4. Modify `frontend/tailwind.config.js` for custom configurations

## 🧪 Testing

Run backend tests:
```bash
cd chatbot/backend
python -m pytest tests/
```

Run frontend tests:
```bash
cd chatbot/frontend
npm test
```

## 📱 Features in Detail

### Smart Greetings
- Automatically detects user timezone
- Provides time-appropriate greetings
- Fallback handling for timezone detection failures

### Spelling Correction
- Advanced text preprocessing
- Context-aware error correction
- Maintains query intent during correction

### Intent Classification
- Multi-layer neural network
- Configurable training parameters
- Support for complex query patterns

### Data Management
- Comprehensive training data structure
- Multiple response formats
- Related information linking
- Query examples for training

## 🌐 Deployment

### Production Build
```bash
# Frontend
cd chatbot/frontend
npm run build

# Backend
cd chatbot/backend
gunicorn app.app:__app -w 4 -k uvicorn.workers.UvicornWorker
```

### Environment Variables
- Set `testing` to `false` in production
- Configure CORS origins for production domains
- Set appropriate logging levels

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](chatbot/LICENSE) file for details.

**Copyright (c) 2024 CMR Technical Campus**

## 🆘 Support

For technical support or questions:
- Check the documentation
- Review the configuration files
- Examine the test files for usage examples
- Contact the development team

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Advanced analytics dashboard
- [ ] Integration with student management systems
- [ ] Mobile app development
- [ ] Enhanced ML model training pipeline
- [ ] Real-time chat improvements
- [ ] Advanced NLP capabilities

---

**Built with ❤️ for CMR Technical Campus**

*Empowering Minds, Shaping Futures*
