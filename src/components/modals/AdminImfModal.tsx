'use client';

import React from 'react';
import { Globe, X, AlertTriangle } from 'lucide-react';

interface AdminImfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  adminImfCode: string;
  setAdminImfCode: (code: string) => void;
  savingImfCode: boolean;
  targetUser: any;
  selectedUserCount: number;
}

export default function AdminImfModal({
  isOpen,
  onClose,
  onSubmit,
  adminImfCode,
  setAdminImfCode,
  savingImfCode,
  targetUser,
  selectedUserCount,
}: AdminImfModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-slideIn p-6 sm:p-8 flex flex-col gap-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3.5 rounded-full bg-amber-100 text-amber-600 border border-amber-200">
            <Globe size={30} />
          </div>
          
          <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">
            Set / Approve IMF Code
          </h3>
          
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Set or approve the <b>International Monetary Fund (IMF)</b> Clearance Code for {selectedUserCount > 0 ? `${selectedUserCount} selected client(s)` : `@${targetUser?.username || 'user'}`}. An approval notification containing the code will be dispatched automatically.
          </p>

          {targetUser?.imfRequest && selectedUserCount <= 0 && (
            <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-800 text-left">
              <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
              <span><b>Pending Request:</b> This client requested an IMF clearance code for their international transfer.</span>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="font-bold text-slate-700 uppercase text-[10px]">IMF Clearance Code</label>
            <input
              type="text"
              required
              autoFocus
              value={adminImfCode}
              onChange={(e) => setAdminImfCode(e.target.value)}
              placeholder="Enter 5-digit IMF Code (e.g. 59281)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold tracking-widest text-center focus:outline-none focus:border-amber-500 text-slate-800"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingImfCode || !adminImfCode.trim()}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
            >
              {savingImfCode ? 'Saving...' : 'Save & Approve'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
