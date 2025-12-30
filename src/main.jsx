import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { registerLicense } from '@syncfusion/ej2-base';
import App from './App.jsx'
// Syncfusion base theme
import '@syncfusion/ej2-base/styles/material.css';

// Buttons
import '@syncfusion/ej2-buttons/styles/material.css';

// Calendars
import '@syncfusion/ej2-calendars/styles/material.css';

// Dropdowns
import '@syncfusion/ej2-dropdowns/styles/material.css';

// Inputs
import '@syncfusion/ej2-inputs/styles/material.css';

// Navigation
import '@syncfusion/ej2-navigations/styles/material.css';

// Popups
import '@syncfusion/ej2-popups/styles/material.css';

// SplitButtons
import '@syncfusion/ej2-splitbuttons/styles/material.css';

// Grid
import '@syncfusion/ej2-react-grids/styles/material.css';


import '../node_modules/@syncfusion/ej2-base/styles/material.css';  
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';  
import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';  
import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';  
import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../node_modules/@syncfusion/ej2-grids/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-treegrid/styles/material.css";



//scheduler
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";


registerLicense('Ngo9BigBOggjGyl/Vkd+XU9FcVRDQmtWfFN0Q3NcdVt1flFAcC0sT3RfQFhiS31TdkVmXH9fdH1QT2tfUA==');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
