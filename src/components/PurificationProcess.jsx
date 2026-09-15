import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Filter, Activity, Sun, Zap, CheckCircle2 } from 'lucide-react';

export default function PurificationProcess() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      step: 1,
      title: 'Dual Sand & Quartz Filter',
      short: 'Coarse Filtration',
      icon: Filter,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
      description: 'Removes visible suspended particles, dust, silt, and heavy turbidity using high-density silica sand and micro-quartz beds.',
      benefit: 'Clears raw water clarity to 99.9%'
    },
    {
      step: 2,
      title: 'Activated Carbon Block',
      short: 'Odour & Chlorine Removal',
      icon: Sparkles,
      image: '/images/step-2-carbon.jpg',
      description: 'Adsorbs dissolved organic compounds, residual chlorine, pesticides, bad taste, and foul odours using premium coconut shell carbon.',
      benefit: 'Enhances natural water taste and freshness'
    },
    {
      step: 3,
      title: 'Micro Micron Filtration (5µm)',
      short: 'Fine Sediment Filter',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=600',
      description: 'Traps ultra-fine particles down to 5 microns ensuring crystal clear water before entering high pressure RO membranes.',
      benefit: 'Protects RO membrane longevity'
    },
    {
      step: 4,
      title: 'High Pressure Reverse Osmosis (RO)',
      short: 'TDS & Heavy Metal Elimination',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      description: 'Forces water through semi-permeable membranes (0.0001 micron) removing 99%+ dissolved salts, lead, mercury, arsenic, and nitrates.',
      benefit: 'Optimum TDS balancing for daily consumption'
    },
    {
      step: 5,
      title: 'UV Sterilization Chamber',
      short: 'Germicidal UV Disinfection',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600',
      description: 'Exposes water to high-intensity germicidal UV-C light (254 nm), neutralizing 99.99% of bacteria, viruses, and pathogens.',
      benefit: '100% Pathogen-free biological safety'
    },
    {
      step: 6,
      title: 'Ozone (O3) Oxygenation Treatment',
      short: 'Active Oxygen Oxidation',
      icon: Zap,
      image: '/images/step-6-ozone.jpg',
      description: 'Injects food-grade ozone gas into purified water for instant sterilization and long-lasting shelf life without chemical residues.',
      benefit: 'Ensures water remains pure inside sealed cans for weeks'
    },
    {
      step: 7,
      title: 'Automated Hygienic Can Washing & Bottling',
      short: 'No-Touch Touchless Packing',
      icon: CheckCircle2,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
      description: 'Cans undergo 5-stage automated inner/outer hot water & ozonated wash before instant robotic filling and tamper-proof sealing.',
      benefit: 'Zero human touch contact guarantee'
    }
  ];

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-slate-800 relative overflow-hidden">
      
      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 border border-amber-500 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-slate-950" /> ISO & BIS Certified Quality
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          7-Stage Multi-Barrier <span className="text-cyan-300 font-black">Purification Process</span>
        </h2>
        <p className="text-slate-200 text-sm font-bold mt-2">
          Click on any stage below to explore how we convert raw water into 100% pure, crisp, healthy packaged drinking water.
        </p>
      </div>

      {/* Interactive 7-Stage Selector Grid (Zero Clipping & Full Step 1 Visibility) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5 mb-8 relative z-10">
        {stages.map((stg, idx) => {
          const isActive = activeStage === idx;
          const isFirst = stg.step === 1;
          return (
            <button
              key={stg.step}
              onClick={() => setActiveStage(idx)}
              className={`p-2.5 sm:p-3 rounded-2xl flex flex-col items-start gap-1.5 transition-all duration-200 border-2 cursor-pointer text-left w-full ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xl border-amber-500 scale-[1.02]'
                  : isFirst
                  ? 'bg-slate-900 text-amber-300 hover:bg-slate-800 border-amber-400 font-black shadow-md'
                  : 'bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white border-slate-800 font-bold'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  isActive 
                    ? 'bg-slate-950 text-amber-400' 
                    : isFirst 
                    ? 'bg-amber-400 text-slate-950' 
                    : 'bg-slate-800 text-slate-200'
                }`}>
                  {stg.step}
                </span>
                {isFirst && (
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-400 text-slate-950'
                  }`}>
                    STEP 1
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs font-black leading-tight mt-0.5">
                {stg.short}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card with Image */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 relative z-10 transition-all duration-500 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-3 py-1 rounded-full border border-amber-500 shadow-sm">
                STEP {stages[activeStage].step} OF 7: {stages[activeStage].short.toUpperCase()}
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full border border-cyan-400/30">
                {stages[activeStage].benefit}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white">{stages[activeStage].title}</h3>
            <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed">
              {stages[activeStage].description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-black text-amber-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Step {stages[activeStage].step} Quality Standard: 100% Tested & Verified against 48 BIS Parameters</span>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl relative h-52 sm:h-60 group bg-slate-950">
              <img 
                src={stages[activeStage].image} 
                alt={stages[activeStage].title}
                onError={(e) => { e.target.src = '/images/purity-glass.jpg'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-3.5 flex items-end justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-2.5 py-1 rounded shadow">
                  Step {stages[activeStage].step}: {stages[activeStage].short}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
