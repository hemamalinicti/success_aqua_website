import React from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, HeartHandshake, Eye, Target, 
  Sparkles, Factory, Cpu, Droplets, Users, PhoneCall, Building2 
} from 'lucide-react';

export default function About({ onOpenOrder, onOpenCallback }) {
  const certifications = [
    {
      code: 'ISO 9001:2015',
      title: 'Quality Management System',
      authority: 'International Organization for Standardization',
      desc: 'Certified for rigorous operational controls, standardized purification protocols, and continuous quality audits.',
      icon: Award,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 font-black'
    },
    {
      code: 'FSSAI Licensed',
      title: 'Food Safety & Standards Authority',
      authority: 'Government of India (Lic No. 12421020000341)',
      desc: 'Fully licensed and compliant with national food safety guidelines for packaged drinking water manufacturing & bottling.',
      icon: ShieldCheck,
      badgeColor: 'bg-cyan-100 text-slate-950 border-cyan-400 font-black'
    },
    {
      code: 'BIS IS:14543',
      title: 'Bureau of Indian Standards',
      authority: 'Standard Mark Certification',
      desc: 'Tested and verified against 48 chemical, physical, and microbiological water purity parameters.',
      icon: CheckCircle2,
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-400 font-black'
    },
    {
      code: 'GSTIN Registered',
      title: 'Suvarna Traders Coimbatore',
      authority: 'GSTIN: 33CAHPP5553L1ZB',
      desc: 'Registered branch office located at No.37, Indira Nagar, Sungam By-Pass Road, Sungam, Coimbatore - 641045.',
      icon: Building2,
      badgeColor: 'bg-slate-200 text-slate-950 border-slate-400 font-black'
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
      
      {/* ABOUT US HERO BANNER WITH WATER SPLASH IMAGE */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border-2 border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/about-hero.jpg" 
            alt="Pure Water Splash Hydration" 
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50 z-0"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <span className="inline-block text-xs font-black text-slate-950 uppercase tracking-widest bg-amber-400 px-4 py-1.5 rounded-full border border-amber-500 shadow-sm">
              About Suvarna Traders & Success Aqua Green
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Nurturing Health Through <br />
              <span className="text-cyan-300 font-black">
                Pure & Safe Hydration
              </span>
            </h1>
            <p className="text-slate-200 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl">
              Established in Sungam By-Pass Road, Coimbatore to provide clean, 7-stage RO purified drinking water (300ml - 20L) and factory-manufactured empty Polycarbonate cans and PET bottles across Tamil Nadu.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-60 sm:w-56 sm:h-68 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl group">
              <img 
                src="/images/about-hero.jpg" 
                alt="Pure Water Splash Showcase" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase text-amber-400">Purity Standard</span>
                <p className="text-xs font-black text-white">Pure & Fresh Hydration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story & Background Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-black text-slate-950 bg-amber-400 px-3 py-1.5 rounded-lg border border-amber-500">
            <Factory className="w-4 h-4 text-slate-950" /> Bottling Plant & Can Manufacturing Unit
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Story & Commitment to Purity
          </h2>
          <p className="text-slate-800 text-sm font-semibold leading-relaxed">
            At <strong>Success Aqua Green (Suvarna Traders)</strong>, we believe that access to pure, crisp, pathogen-free drinking water is a fundamental right. Our plant operates with fully automated European-standard RO purification systems and stainless-steel micro-filtration setups.
          </p>
          <p className="text-slate-800 text-sm font-semibold leading-relaxed">
            Every water container delivered by our team is subjected to a 5-step automated washing, ozonated rinsing, and robotic touchless capping process. We supply all bottle sizes (300ml, 500ml, 1L, 2L, 5L, 20L) for marriage functions, celebrations, corporate offices, and homes.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" /> 100% Food-Grade Cans
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" /> Daily Quality Audits
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" /> GSTIN: 33CAHPP5553L1ZB
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-200 group">
          <img 
            src="/images/about-water.png" 
            alt="Pure Sparkling Water Glass" 
            className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end text-white">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Coimbatore Sungam Hub</span>
            <p className="text-lg font-black text-white">25,000+ Liters Processed Daily</p>
          </div>
        </div>
      </div>

      {/* PLANT & LOGISTICS FACILITY PHOTO SHOWCASE */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-slate-950 uppercase tracking-widest bg-amber-400 px-4 py-1.5 rounded-full border border-amber-500 shadow-sm">
            Infrastructure & Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Sungam Plant & Quality Testing Lab
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-xl relative h-56 group">
            <img 
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800" 
              alt="7-Stage RO Filtration Unit" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-black uppercase text-amber-400">Purification Unit</span>
              <p className="text-base font-black text-white">Stainless Steel 7-Stage RO System</p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-xl relative h-56 group">
            <img 
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800" 
              alt="NABL Quality Testing Lab" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-black uppercase text-amber-400">Quality Control</span>
              <p className="text-base font-black text-white">Daily TDS & Microbiological Lab Audits</p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-xl relative h-56 group">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
              alt="Express Delivery Truck Fleet" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-black uppercase text-amber-400">Doorstep Logistics</span>
              <p className="text-base font-black text-white">Express Delivery Fleet Across Coimbatore</p>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION & VISION CARDS - High Contrast Solid Dark Backgrounds with Bold Pure White Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mission Card */}
        <div className="bg-slate-950 text-white p-8 rounded-3xl shadow-2xl space-y-4 relative overflow-hidden border-2 border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black shadow-md">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white">Our Mission</h3>
          <p className="text-slate-100 text-sm font-semibold leading-relaxed">
            To provide every household, function hall, and enterprise in Coimbatore with affordable, 100% pure, 7-stage purified packaged drinking water (300ml - 20L) through efficient doorstep delivery, uncompromised hygiene, and courteous customer support.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl space-y-4 relative overflow-hidden border-2 border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
            <Eye className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white">Our Vision</h3>
          <p className="text-slate-100 text-sm font-semibold leading-relaxed">
            To become South India's most dependable packaged water supply and empty can manufacturing brand by expanding sustainable bottle recycling initiatives and adopting smart solar-assisted purification technology.
          </p>
        </div>

      </div>

      {/* Certifications & Trust Badges */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-black text-slate-900 uppercase tracking-widest bg-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500">
            Quality Assurance
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">Certifications & Business Registration</h2>
          <p className="text-slate-700 text-sm mt-1 font-semibold">Our products are licensed, tested, and certified by governing food & health authorities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${cert.badgeColor}`}>
                  {React.createElement(cert.icon, { className: "w-4 h-4" })}
                  {cert.code}
                </span>
                <h3 className="font-black text-base text-slate-900">{cert.title}</h3>
                <p className="text-xs font-bold text-slate-600">{cert.authority}</p>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">{cert.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center text-xs font-black text-cyan-700 gap-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" /> Active License
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border-2 border-slate-800 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black text-white">Ready to Place Your Water Can or Bottle Order?</h2>
        <p className="text-slate-200 text-sm max-w-xl mx-auto font-semibold">
          Order 300ml, 500ml, 1L, 2L, 5L, or 20L water cans for your home or book mass water supply for your upcoming function.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onOpenOrder}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition text-base"
          >
            Order Water Cans / Bottles
          </button>
          <button
            onClick={onOpenCallback}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition text-base"
          >
            Request Call Back
          </button>
        </div>
      </div>

    </div>
  );
}
