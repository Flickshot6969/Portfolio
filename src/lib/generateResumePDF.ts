'use client'

import QRCode from 'qrcode';

// Professional Resume PDF Generator
// Clean, ATS-friendly, recruiter-approved design with QR Code

// Portfolio URL for QR Code
const PORTFOLIO_URL = 'https://devpatel-portfolio.vercel.app';

// Generate QR Code as Base64 Data URL
const generateQRCode = async (): Promise<string> => {
  try {
    const qrDataURL = await QRCode.toDataURL(PORTFOLIO_URL, {
      width: 80,
      margin: 1,
      color: {
        dark: '#4f46e5',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
    return qrDataURL;
  } catch (error) {
    console.error('QR Code generation failed:', error);
    return '';
  }
};

const generateResumeHTML = (qrCodeDataURL: string): string => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dev Patel - Resume</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
@page{size:A4;margin:0.5in 0.6in}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;font-size:10.5px;line-height:1.5;color:#1f2937;background:#fff;max-width:800px;margin:0 auto;padding:30px 40px}

/* Print Instructions */
.print-banner{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);color:#fff;padding:16px 24px;border-radius:12px;margin-bottom:24px;text-align:center;box-shadow:0 4px 20px rgba(79,70,229,0.3)}
.print-banner h3{font-size:15px;font-weight:600;margin-bottom:4px}
.print-banner p{font-size:11px;opacity:0.9}
@media print{.print-banner{display:none!important}}

/* Header - Professional & Clean */
.header{text-align:center;padding-bottom:20px;margin-bottom:20px;border-bottom:2px solid #e5e7eb;position:relative}
.header::after{content:'';position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);width:80px;height:2px;background:linear-gradient(90deg,#4f46e5,#7c3aed)}
.header h1{font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:700;color:#111827;letter-spacing:0.5px;margin-bottom:6px}
.header .title{font-size:13px;font-weight:500;color:#4f46e5;letter-spacing:0.3px;margin-bottom:12px}
.contact-row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px;font-size:10px;color:#4b5563}
.contact-item{display:flex;align-items:center;gap:4px}
.contact-item a{color:#4b5563;text-decoration:none}
.contact-item a:hover{color:#4f46e5}

/* Section Styling */
.section{margin-bottom:18px}
.section-title{font-size:11px;font-weight:700;color:#111827;text-transform:uppercase;letter-spacing:1.5px;padding-bottom:6px;margin-bottom:12px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:8px}
.section-title::before{content:'';width:3px;height:14px;background:linear-gradient(180deg,#4f46e5,#7c3aed);border-radius:2px}

/* Summary */
.summary{background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);padding:14px 16px;border-radius:8px;font-size:10.5px;color:#374151;line-height:1.6;border-left:3px solid #4f46e5}

/* Experience & Education Items */
.item{margin-bottom:14px;padding-bottom:12px;border-bottom:1px dashed #e5e7eb}
.item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.item-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;gap:10px}
.item-left{flex:1}
.item-title{font-size:12px;font-weight:600;color:#111827}
.item-subtitle{font-size:10.5px;color:#4f46e5;font-weight:500}
.item-location{font-size:9.5px;color:#6b7280;font-style:italic}
.item-date{font-size:9px;color:#4f46e5;background:#ede9fe;padding:3px 10px;border-radius:12px;font-weight:500;white-space:nowrap}
.item-list{list-style:none;margin-top:6px}
.item-list li{padding:2px 0 2px 16px;position:relative;font-size:10px;color:#4b5563}
.item-list li::before{content:'▸';position:absolute;left:0;color:#4f46e5;font-size:10px}

/* Two Column Layout */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px}

/* Skills Grid */
.skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.skill-box{background:#f8fafc;padding:10px 12px;border-radius:6px;border:1px solid #e5e7eb}
.skill-box h4{font-size:9px;font-weight:600;color:#4f46e5;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px}
.skill-tags{display:flex;flex-wrap:wrap;gap:4px}
.skill-tag{background:#fff;color:#374151;padding:3px 8px;border-radius:10px;font-size:8.5px;border:1px solid #e5e7eb;font-weight:500}

/* Achievements */
.achievements-list{columns:2;column-gap:20px}
.achievements-list li{break-inside:avoid;padding:3px 0 3px 16px;position:relative;font-size:10px;color:#4b5563}
.achievements-list li::before{content:'★';position:absolute;left:0;color:#f59e0b;font-size:9px}

/* Page 2 - Certifications */
.page-break{page-break-before:always;padding-top:20px}
.cert-header{text-align:center;padding:20px;margin-bottom:20px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%);border-radius:12px;color:#fff}
.cert-header h2{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;margin-bottom:6px;letter-spacing:0.5px}
.cert-header p{font-size:10px;opacity:0.9}
.cert-category{font-size:11px;font-weight:600;color:#4f46e5;margin:16px 0 10px;padding:8px 12px;background:#f8fafc;border-radius:6px;border-left:3px solid #4f46e5}
.cert-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.cert-card{background:#f8fafc;border-radius:8px;padding:12px;border:1px solid #e5e7eb}
.cert-card h4{font-size:10.5px;font-weight:600;color:#111827;margin-bottom:4px}
.cert-card .issuer{font-size:9.5px;color:#4f46e5;font-weight:500}
.cert-card .year{font-size:8px;color:#6b7280;background:#e5e7eb;padding:2px 8px;border-radius:10px;display:inline-block;margin-top:4px}
.cert-card .cred-id{font-size:7.5px;color:#9ca3af;margin-top:6px;font-family:'Courier New',monospace;background:#f1f5f9;padding:3px 6px;border-radius:3px;word-break:break-all}
.cert-starbucks{border-left:3px solid #00704A}
.cert-starbucks .issuer{color:#00704A}

/* Footer */
.footer{text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:8.5px}
.footer p{margin:2px 0}

/* QR Code Section - Professional Portfolio Link */
.qr-section{position:absolute;top:30px;right:40px;text-align:center}
.qr-container{background:linear-gradient(135deg,#f8fafc 0%,#fff 100%);padding:8px;border-radius:10px;border:2px solid #e5e7eb;box-shadow:0 2px 8px rgba(79,70,229,0.1)}
.qr-container img{width:70px;height:70px;display:block}
.qr-label{font-size:7px;color:#4f46e5;font-weight:600;margin-top:4px;text-transform:uppercase;letter-spacing:0.5px}
.qr-sublabel{font-size:6px;color:#6b7280;margin-top:1px}
@media print{.qr-section{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}

/* Print Optimization */
@media print{
  body{padding:0;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
  .cert-header{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
  .header::after{-webkit-print-color-adjust:exact!important}
}
</style>
</head>
<body>

<!-- Print Instructions Banner -->
<div class="print-banner">
  <h3>📄 Save as Professional PDF</h3>
  <p>Press Ctrl+P → Select "Save as PDF" or "Microsoft Print to PDF" → Click Save</p>
</div>

<!-- HEADER -->
<header class="header">
  <h1>DEV PATEL</h1>
  <div class="title">General Secretary • Event Production Head • Marketing Strategist</div>
  <div class="contact-row">
    <span class="contact-item">📧 <a href="mailto:devpatel170521@gmail.com">devpatel170521@gmail.com</a></span>
    <span class="contact-item">📍 Ahmedabad, Gujarat, India</span>
    <span class="contact-item">🔗 <a href="https://linkedin.com/in/devpatel170521">linkedin.com/in/devpatel170521</a></span>
    <span class="contact-item">💻 <a href="https://github.com/devpatel170521">github.com/devpatel170521</a></span>
  </div>
</header>

<!-- QR Code for Portfolio -->
${qrCodeDataURL ? `
<div class="qr-section">
  <div class="qr-container">
    <img src="${qrCodeDataURL}" alt="Portfolio QR Code" />
    <div class="qr-label">📱 Scan Me</div>
    <div class="qr-sublabel">View Full Portfolio</div>
  </div>
</div>
` : ''}

<!-- PROFESSIONAL SUMMARY -->
<section class="section">
  <h2 class="section-title">Professional Summary</h2>
  <div class="summary">
    Results-driven Student Leader and Strategic Executive with 1+ years of progressive leadership experience at Gandhinagar University. Currently serving as <strong>General Secretary</strong> while concurrently heading <strong>Event Production</strong> and <strong>Campaign & Marketing</strong> divisions. Demonstrated expertise in governance, policy execution, large-scale event management, and digital marketing strategy. Former <strong>Starbucks Barista</strong> with exceptional customer experience and operational excellence track record. Pursuing B.Tech in Computer Science & Engineering at Gandhinagar Institute of Technology (2023-2027). Recognized for decisive leadership, data-driven decision-making, cross-functional team coordination, and delivering high-impact outcomes with accountability and strategic intent.
  </div>
</section>

<!-- PROFESSIONAL EXPERIENCE -->
<section class="section">
  <h2 class="section-title">Professional Experience</h2>
  
  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">General Secretary</div>
        <div class="item-subtitle">Gandhinagar University</div>
        <div class="item-location">Ahmedabad, Gujarat</div>
      </div>
      <span class="item-date">Aug 2025 – Present</span>
    </div>
    <ul class="item-list">
      <li>Spearheading student governance as primary liaison between 5,000+ students and university administration</li>
      <li>Orchestrating university-wide academic, cultural, and professional development initiatives with strategic oversight</li>
      <li>Driving policy execution and ensuring institutional compliance across all student organizations and councils</li>
      <li>Delivering structured, high-impact outcomes through decisive decision-making and disciplined execution</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">Head of Event Production & Campaign Marketing</div>
        <div class="item-subtitle">Gandhinagar University</div>
        <div class="item-location">Ahmedabad, Gujarat</div>
      </div>
      <span class="item-date">Aug 2025 – Present</span>
    </div>
    <ul class="item-list">
      <li>Leading end-to-end execution of dynamic campus events with meticulous logistics and resource management</li>
      <li>Architecting comprehensive marketing campaigns from strategy and positioning to execution and analytics</li>
      <li>Managing cross-functional volunteer teams and multi-stakeholder collaboration for event success</li>
      <li>Leveraging data-driven insights to optimize campaign performance and maximize audience engagement</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">Jazba Head (Annual Cultural Fest) & Cultural Secretary</div>
        <div class="item-subtitle">Gandhinagar University Student Council</div>
        <div class="item-location">Ahmedabad, Gujarat</div>
      </div>
      <span class="item-date">Sep 2024 – Oct 2025</span>
    </div>
    <ul class="item-list">
      <li>Led flagship annual cultural festival with comprehensive event planning and production oversight for 50+ events</li>
      <li>Coordinated team of 100+ volunteers across multiple event verticals, committees, and performance categories</li>
      <li>Managed talent acquisition, artist coordination, logistics, budgets, and vendor relationships</li>
      <li>Delivered exceptional event experiences resulting in record-breaking student participation</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">Barista</div>
        <div class="item-subtitle">Starbucks India (Tata Starbucks Pvt. Ltd.)</div>
        <div class="item-location">Ahmedabad, Gujarat</div>
      </div>
      <span class="item-date">Feb 2025 – Sep 2025</span>
    </div>
    <ul class="item-list">
      <li>Delivered exceptional customer experiences in high-volume, fast-paced retail environment serving 200+ customers daily</li>
      <li>Mastered espresso crafting, beverage preparation, latte art, and food safety compliance standards</li>
      <li>Developed advanced interpersonal, multitasking, and real-time problem-solving capabilities</li>
      <li>Recognized for outstanding service quality, team collaboration, and achieving customer satisfaction targets</li>
    </ul>
  </div>
</section>

<!-- EDUCATION -->
<section class="section">
  <h2 class="section-title">Education</h2>
  
  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">Bachelor of Technology (B.Tech) – Computer Science & Engineering</div>
        <div class="item-subtitle">Gandhinagar Institute of Technology (GTU Affiliated)</div>
        <div class="item-location">Gandhinagar, Gujarat</div>
      </div>
      <span class="item-date">2023 – 2027</span>
    </div>
    <ul class="item-list">
      <li>Concurrent leadership roles: General Secretary, Event Production Head, Campaign & Marketing Head</li>
      <li>Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, Cloud Computing, Computer Networks</li>
      <li>Founding member and active contributor to technical and cultural student organizations</li>
      <li>Participated in hackathons, coding competitions, and tech workshops</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">Higher Secondary Education (HSC) – Science Stream</div>
        <div class="item-subtitle">Maharaja Agrasen Vidyalaya (CBSE Board)</div>
        <div class="item-location">Ahmedabad, Gujarat</div>
      </div>
      <span class="item-date">2021 – 2023</span>
    </div>
    <ul class="item-list">
      <li>Science stream with focus on Physics, Chemistry, Mathematics, and Computer Science</li>
      <li>Developed strong analytical thinking and problem-solving foundation</li>
      <li>Active participant in school events, science exhibitions, and inter-school competitions</li>
    </ul>
  </div>

  <div class="item">
    <div class="item-header">
      <div class="item-left">
        <div class="item-title">Secondary Education (SSC) – All Subjects</div>
        <div class="item-subtitle">Maharaja Agrasen Vidyalaya (CBSE Board)</div>
        <div class="item-location">Ahmedabad, Gujarat</div>
      </div>
      <span class="item-date">2013 – 2021</span>
    </div>
    <ul class="item-list">
      <li>Built strong academic foundation across all core subjects including Mathematics, Science, English, and Social Studies</li>
      <li>Developed foundational communication, management, and organizational competencies</li>
      <li>Active participant in extracurricular activities, house events, and leadership programs</li>
      <li>Cultivated early leadership skills through class representative and event coordination roles</li>
    </ul>
  </div>
</section>

<!-- TECHNICAL SKILLS -->
<section class="section">
  <h2 class="section-title">Technical Skills</h2>
  <div class="skills-grid">
    <div class="skill-box">
      <h4>Frontend Development</h4>
      <div class="skill-tags">
        <span class="skill-tag">React.js</span>
        <span class="skill-tag">Next.js</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">JavaScript (ES6+)</span>
        <span class="skill-tag">HTML5</span>
        <span class="skill-tag">CSS3</span>
        <span class="skill-tag">Tailwind CSS</span>
      </div>
    </div>
    <div class="skill-box">
      <h4>Backend & Database</h4>
      <div class="skill-tags">
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Express.js</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">MongoDB</span>
        <span class="skill-tag">MySQL</span>
        <span class="skill-tag">REST APIs</span>
      </div>
    </div>
    <div class="skill-box">
      <h4>Cloud & DevOps</h4>
      <div class="skill-tags">
        <span class="skill-tag">AWS</span>
        <span class="skill-tag">IBM Cloud</span>
        <span class="skill-tag">Git/GitHub</span>
        <span class="skill-tag">Vercel</span>
        <span class="skill-tag">CI/CD</span>
        <span class="skill-tag">Firebase</span>
      </div>
    </div>
    <div class="skill-box">
      <h4>Marketing & Tools</h4>
      <div class="skill-tags">
        <span class="skill-tag">Digital Marketing</span>
        <span class="skill-tag">SEO</span>
        <span class="skill-tag">HubSpot</span>
        <span class="skill-tag">Figma</span>
        <span class="skill-tag">Canva</span>
        <span class="skill-tag">Analytics</span>
      </div>
    </div>
  </div>
</section>

<!-- KEY ACHIEVEMENTS -->
<section class="section">
  <h2 class="section-title">Key Achievements</h2>
  <ul class="achievements-list">
    <li>Elected General Secretary of Gandhinagar University, representing 5,000+ students</li>
    <li>Concurrently managing Event Production and Campaign & Marketing divisions</li>
    <li>Led Jazba Annual Cultural Fest with 50+ events and 100+ volunteer team</li>
    <li>Served as Cultural Secretary for 1+ year, organizing 20+ programs</li>
    <li>Earned 10+ professional certifications from IBM, HubSpot, AWS, Deloitte</li>
    <li>Completed comprehensive Starbucks barista training program</li>
    <li>Built responsive full-stack portfolio using Next.js, React, and modern tech</li>
    <li>Recognized for exceptional customer service at Starbucks India</li>
  </ul>
</section>

<!-- PAGE 2: CERTIFICATIONS -->
<div class="page-break">
  <div class="cert-header">
    <h2>Professional Certifications</h2>
    <p>Verified credentials demonstrating expertise across technology, cloud computing, and customer service domains</p>
  </div>

  <div class="cert-category">💻 Technical & Professional Certifications</div>
  <div class="cert-grid">
    <div class="cert-card">
      <h4>Cybersecurity Fundamentals</h4>
      <div class="issuer">IBM SkillsBuild</div>
      <span class="year">2026</span>
      <div class="cred-id">Credly Verified Badge</div>
    </div>
    <div class="cert-card">
      <h4>Cloud Computing Fundamentals</h4>
      <div class="issuer">IBM</div>
      <span class="year">2025</span>
      <div class="cred-id">ID: IBMDesign20251216</div>
    </div>
    <div class="cert-card">
      <h4>Digital Marketing Certification</h4>
      <div class="issuer">HubSpot Academy</div>
      <span class="year">2025</span>
      <div class="cred-id">ID: 8268d9048f3b4ff5a4705726ea0376bd</div>
    </div>
    <div class="cert-card">
      <h4>AWS Solutions Architecture Job Simulation</h4>
      <div class="issuer">Forage (Amazon Web Services)</div>
      <span class="year">2025</span>
      <div class="cred-id">ID: ftTNijFvh63WZw3CY</div>
    </div>
    <div class="cert-card">
      <h4>Cyber Security Job Simulation</h4>
      <div class="issuer">Forage (Deloitte Australia)</div>
      <span class="year">2025</span>
      <div class="cred-id">ID: ZtiKmGKFkQPPuQXnp</div>
    </div>
    <div class="cert-card">
      <h4>Technology Consulting Job Simulation</h4>
      <div class="issuer">Forage (Deloitte Australia)</div>
      <span class="year">2025</span>
      <div class="cred-id">ID: B9kbwjNiMAHWr2rjn</div>
    </div>
  </div>

  <div class="cert-category">☕ Starbucks Professional Training Program</div>
  <div class="cert-grid">
    <div class="cert-card cert-starbucks">
      <h4>Food Safety & Handling Certification</h4>
      <div class="issuer">Starbucks India (Tata Starbucks)</div>
      <span class="year">2025</span>
    </div>
    <div class="cert-card cert-starbucks">
      <h4>Espresso Excellence & Latte Art</h4>
      <div class="issuer">Starbucks India (Tata Starbucks)</div>
      <span class="year">2025</span>
    </div>
    <div class="cert-card cert-starbucks">
      <h4>Customer Connection Excellence</h4>
      <div class="issuer">Starbucks Global Training</div>
      <span class="year">2025</span>
    </div>
    <div class="cert-card cert-starbucks">
      <h4>Frappuccino Master Certification</h4>
      <div class="issuer">Starbucks India (Tata Starbucks)</div>
      <span class="year">2025</span>
    </div>
    <div class="cert-card cert-starbucks">
      <h4>Core Operations & Policy Compliance</h4>
      <div class="issuer">Starbucks India (Tata Starbucks)</div>
      <span class="year">2025</span>
    </div>
  </div>

  <div class="footer">
    <p>📋 All certifications are verified and available for review upon request</p>
    <p>🔗 LinkedIn: linkedin.com/in/devpatel170521 | Portfolio: devpatel-portfolio.vercel.app</p>
    <p style="margin-top:6px;color:#6b7280;">Generated on ${currentDate}</p>
  </div>
</div>

</body>
</html>`;
};

// Download resume as highly compressed PDF via print dialog (with QR Code)
export const downloadResumePDF = async (): Promise<void> => {
  // Generate QR Code first
  const qrCodeDataURL = await generateQRCode();
  
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (printWindow) {
    printWindow.document.write(generateResumeHTML(qrCodeDataURL));
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    const triggerPrint = () => {
      printWindow.focus();
      printWindow.print();
    };
    
    printWindow.onload = () => setTimeout(triggerPrint, 200);
    // Fallback
    setTimeout(triggerPrint, 800);
  }
};

// Generate and download as HTML file (ultra-compressed alternative with QR Code)
export const downloadResumeHTML = async (): Promise<void> => {
  // Generate QR Code first
  const qrCodeDataURL = await generateQRCode();
  
  const htmlContent = generateResumeHTML(qrCodeDataURL);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Dev_Patel_Resume.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default downloadResumePDF;
