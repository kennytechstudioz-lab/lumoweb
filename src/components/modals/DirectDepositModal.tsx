'use client';

import React from 'react';
import { DollarSign, X, Send } from 'lucide-react';

interface DirectDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  depositForm: {
    username: string;
    amount: string;
    currency: string;
    description: string;
  };
  setDepositForm: React.Dispatch<
    React.SetStateAction<{
      username: string;
      amount: string;
      currency: string;
      description: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  submittingDeposit: boolean;
}

export default function DirectDepositModal({
  isOpen,
  onClose,
  depositForm,
  setDepositForm,
  onSubmit,
  submittingDeposit,
}: DirectDepositModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-slideIn">
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={18} className="text-primary" />
            <span>Inject Account Deposit Credit</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 cursor-pointer p-1 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit}>
          <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-light text-slate-500 leading-relaxed">
              Manually inject approved funds directly to any client account. This bypasses transfer clearances and updates user account available balances instantly.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-650 uppercase">Recipient Username</label>
              <input
                type="text"
                required
                value={depositForm.username}
                onChange={(e) => setDepositForm({ ...depositForm, username: e.target.value })}
                placeholder="Enter client username"
                className="border border-slate-200 rounded px-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-650 uppercase">Currency</label>
                <select
                  value={depositForm.currency}
                  onChange={(e) => setDepositForm({ ...depositForm, currency: e.target.value })}
                  className="border border-slate-200 rounded px-2.5 py-2.5 text-xs bg-slate-50 text-slate-750 focus:outline-none focus:border-primary font-semibold"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-650 uppercase">Deposit Amount</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={depositForm.amount}
                  onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })}
                  placeholder="0.00"
                  className="border border-slate-200 rounded px-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-primary font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-650 uppercase">Transaction Description</label>
              <input
                type="text"
                required
                value={depositForm.description}
                onChange={(e) => setDepositForm({ ...depositForm, description: e.target.value })}
                placeholder="e.g. Wire Transfer Credit Adjustment"
                className="border border-slate-200 rounded px-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submittingDeposit}
              className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-5 py-2.5 rounded shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send size={12} />
              <span>{submittingDeposit ? 'Crediting...' : 'Inject Credit'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
