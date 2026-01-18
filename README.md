# Contract Management Platform

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.12.0-CA4245.svg)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A comprehensive frontend-based Contract Management Platform built with React and Vite, featuring blueprint creation, contract lifecycle management, and a professional dashboard interface. This project demonstrates modern React development practices, clean architecture, and responsive UI design.

## 🚀 Live Demo

The application is currently running at: **http://localhost:5174**

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture--design-decisions)
- [Functional Requirements](#-functional-requirements-implementation)
- [Tech Stack](#-tech-stack)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎨 **Blueprint Management**
- Create custom contract blueprints with positioned fields
- Support for multiple field types: Text, Date, Signature, Checkbox
- Visual field positioning on canvas
- Field metadata management (label, type, coordinates)
- **Sample Data**: One-click loading of pre-configured blueprints for quick demo
- **Data Management**: Clear all data functionality for fresh starts

### 📄 **Contract Lifecycle**
- **Status Flow**: Created → Approved → Sent → Signed → Locked
- **Revocation**: Available after Created or Sent status
- **Strict Validation**: Enforced state transitions
- **Read-only Protection**: Locked contracts cannot be modified

### 📊 **Dashboard & Analytics**
- **Filterable Table**: View contracts by status groups
  - Active: Created, Approved
  - Pending: Sent
  - Signed: Signed, Locked
- **Search Functionality**: Find contracts by name or blueprint
- **Action Buttons**: Edit, view, and manage contract status
- **Responsive Design**: Works on desktop and mobile devices

### 🎯 **Professional UI/UX**
- **Company Branding**: Eurosys Dubai logo integration
- **Modern Design**: Clean, intuitive interface with consistent styling
- **Responsive Design**: Mobile-optimized layouts with proper breakpoints and touch-friendly interfaces
- **Visual Feedback**: Status indicators, loading states, and error handling
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Full-Width Header & Footer**: Both header and footer span the entire viewport width with consistent alignment

### 💾 **Data Management**
- **Local Storage**: Persistent data across browser sessions
- **Form Validation**: Required field checks and input validation
- **Auto-save**: Automatic data persistence on changes
- **Data Integrity**: Maintains relationships between blueprints and contracts

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sonikumari255jsr-sketch/CMS_Eurusys.git
   cd CMS_Eurusys
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5174` (or the port shown in terminal)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🏗️ Project Structure

```
CMS_Eurusys/
├── public/
│   ├── eurosys-logo.png          # Company logo
│   └── vite.svg                  # Vite logo
├── src/
│   ├── components/
│   │   └── Header.jsx            # Navigation header with logo
│   ├── pages/
│   │   ├── BlueprintPage.jsx     # Blueprint creation interface
│   │   ├── LabelPage.jsx         # Field management for blueprints
│   │   └── DashboardPage.jsx     # Contract dashboard and editor
│   ├── styles/
│   │   ├── App.css               # Main application styles
│   │   ├── Header.css            # Header component styles
│   │   ├── BlueprintPage.css     # Blueprint page styles
│   │   ├── LabelPage.css         # Label page styles
│   │   └── DashboardPage.css     # Dashboard page styles
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles and CSS variables
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                     # Project documentation
```

## 🏛️ Architecture & Design Decisions

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library with modern hooks |
| **Vite** | 7.2.4 | Fast build tool and dev server |
| **React Router DOM** | 7.12.0 | Client-side routing |
| **CSS Modules** | - | Scoped component styling |
| **Local Storage** | - | Client-side data persistence |

### State Management Strategy

- **Component State**: `useState` for local component data
- **Global State**: Context API for shared application state
- **Data Persistence**: Browser localStorage for mock backend
- **State Updates**: Immutable updates with functional patterns

### Design Principles

- **Component Composition**: Modular, reusable UI components
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox
- **Accessibility**: WCAG guidelines with semantic HTML
- **Performance**: Optimized re-renders and lazy loading

## 📋 Functional Requirements Implementation

### 1. Blueprint Creation Workflow
- ✅ Create blueprints with custom field configurations
- ✅ Support for 4 field types: Text, Date, Signature, Checkbox
- ✅ Visual field positioning with X/Y coordinates
- ✅ Field validation and metadata storage

### 2. Contract Management System
- ✅ Blueprint-based contract generation
- ✅ Dynamic form rendering based on blueprint fields
- ✅ Status lifecycle with strict transition rules
- ✅ Contract editing with validation

### 3. Dashboard & Filtering
- ✅ Table view with sortable columns
- ✅ Status-based filtering (Active/Pending/Signed)
- ✅ Search functionality across contracts
- ✅ Action buttons for contract management

### 4. Professional Features
- ✅ Company branding with logo integration
- ✅ Responsive design for all screen sizes
- ✅ Error handling and user feedback
- ✅ Data persistence across sessions

## 🤔 Assumptions & Limitations

### Assumptions Made
- Single-user application (no authentication required)
- Browser localStorage sufficient for data persistence
- Basic field positioning meets requirements
- Manual approval workflow is acceptable
- All contracts follow identical lifecycle rules

### Current Limitations
- Frontend-only (no backend API integration)
- No real-time collaboration features
- Limited to 4 predefined field types
- Basic positioning (grid-based, not drag-and-drop)
- No advanced search filters beyond status
- No export/import functionality
- No user roles or permission system

## 🔧 Development Notes

### Code Quality Standards
- **ESLint**: Configured for consistent code style
- **Functional Components**: Modern React patterns with hooks
- **Meaningful Naming**: Descriptive variable and function names
- **Component Composition**: Reusable, focused components

### Performance Optimizations
- **React.memo**: Prevents unnecessary re-renders
- **Lazy Loading**: Route-based code splitting
- **Optimized Keys**: Proper key props for list rendering
- **Minimal Dependencies**: Lightweight package selection

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ES6+ Features**: Arrow functions, destructuring, modules
- **CSS Grid/Flexbox**: Modern layout techniques
- **Progressive Enhancement**: Graceful degradation

## 📝 Future Enhancements

### High Priority
- [ ] Drag-and-drop field positioning interface
- [ ] PDF export functionality for contracts
- [ ] Advanced search with multiple filters
- [ ] Unit and integration test coverage

### Medium Priority
- [ ] User authentication and role-based access
- [ ] Real-time collaboration features
- [ ] Contract template library
- [ ] Advanced status timeline visualization

### Low Priority
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme toggle
- [ ] Contract versioning system
- [ ] Integration with external APIs

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- Development setup
- Code standards
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for college placement assignment
- Demonstrates modern React development skills
- Features clean architecture and professional UI design
- Showcases full-stack frontend development capabilities

## 📞 Contact Information

**Soni Kumari**
- **Phone**: [+91-9341677226](tel:+91-9341677226)
- **Portfolio**: [https://sonikcv.netlify.app/](https://sonikcv.netlify.app/)
- **Resume**: [View Resume](https://drive.google.com/file/d/1Rhy1LamTWd5MEV2euZmioh9KOw8jXDYD/view)

---

**Built with ❤️ using React & Vite**

