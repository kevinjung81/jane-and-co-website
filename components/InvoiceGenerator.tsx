import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, Upload } from 'lucide-react';

const InvoiceGenerator = () => {
  // State for Invoice Data
  const [invoiceNumber, setInvoiceNumber] = useState('2026-1');
  const [date, setDate] = useState('2026-02-06');
  const [logo, setLogo] = useState<string | null>(null);
  const [taxRate, setTaxRate] = useState(0); 
  
  // Sender Info
  const [senderInfo, setSenderInfo] = useState({
    name: 'JANE & COMPANY',
    address: '2836 Breezy Point Ln, Frisco TX 75034',
    phone: '469-909-7799',
    email: ''
  });

  // Client Info
  const [clientInfo, setClientInfo] = useState({
    name: 'LEX CELL-TX LLC, DBA INTAC SOLUTION',
    addressLine1: '5550 Granite Parkway, Suite 295',
    addressLine2: 'Plano, TX 75024'
  });

  // Bank Info
  const [bankInfo, setBankInfo] = useState({
    bankName: 'Chase',
    accountName: 'Jane & Company',
    accountNumber: '874148288',
    routingNumber: '111000614'
  });

  // Line Items
  const [items, setItems] = useState([
    { id: 1, description: 'HR Project Consulting', quantity: 1, price: 4000.00 },
    { id: 2, description: 'Business Advisory', quantity: 1, price: 2300.00 },
  ]);

  const invoiceRef = useRef<HTMLDivElement>(null);

  // Handle Logo Upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Calculation Logic
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const taxAmount = subtotal * (taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  // Handlers (Fixed: Uncommented so you can edit items!)
  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: 'New Service', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // The Native Print Logic
  const handleDownloadPDF = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-4 pt-28 md:px-8 md:pb-8 md:pt-32 font-sans">
      
      {/* Control Bar */}
      <div className="max-w-[8.5in] mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-xl font-bold text-gray-700">Invoice Editor</h1>
        {/* Fixed: Simplified button without the broken 'isGenerating' logic */}
        <button 
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-[#0ABAB5] hover:bg-[#089a96] text-white px-6 py-2 rounded-md font-medium transition-colors shadow-sm"
        >
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* Invoice Paper (8.5 x 11 inches) */}
      <div 
        ref={invoiceRef}
        className="mx-auto bg-white shadow-lg relative text-gray-800"
        style={{ 
          width: '8.5in', 
          minHeight: '11in',
          padding: '0.75in' 
        }}
      >
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          {/* Logo Area */}
          <div className="w-1/2">
            <div className="mb-4">
              {logo ? (
                <div className="relative group w-48">
                  <img src={logo} alt="Company Logo" className="w-full object-contain" />
                  <label className="no-print absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center transition-opacity rounded">
                    <input type="file" onChange={handleLogoChange} className="hidden" accept="image/*" />
                    <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Change Logo</span>
                  </label>
                </div>
              ) : (
                <label className="w-48 h-24 border-2 border-dashed border-[#0ABAB5] bg-teal-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-teal-100 transition-colors">
                  <Upload size={24} className="text-[#0ABAB5] mb-2" />
                  <span className="text-sm text-[#0ABAB5] font-medium">Click to Upload Logo</span>
                  <input type="file" onChange={handleLogoChange} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>

          {/* Invoice Label & Meta */}
          <div className="text-right">
            <h1 className="text-4xl font-bold tracking-widest text-[#0ABAB5] mb-6">INVOICE</h1>
            
            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Date:</span>
                <div className="relative">
                   <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="text-right font-medium text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#0ABAB5] outline-none w-36"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Invoice #:</span>
                <div className="flex items-center justify-end">
                  <span className="text-[#0ABAB5] font-bold mr-1">#</span>
                  <input 
                    type="text" 
                    value={invoiceNumber} 
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="text-right font-medium text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#0ABAB5] outline-none w-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-12">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Billed To:</h3>
          <input 
            value={clientInfo.name}
            onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
            className="block w-full text-xl font-bold text-gray-800 mb-1 border-none focus:ring-0 p-0 uppercase placeholder-gray-300"
            placeholder="CLIENT NAME"
          />
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-gray-600 w-16">Address:</span>
            <input 
              value={clientInfo.addressLine1}
              onChange={(e) => setClientInfo({...clientInfo, addressLine1: e.target.value})}
              className="w-full text-gray-600 border-none focus:ring-0 p-0 placeholder-gray-300"
              placeholder="Street Address"
            />
          </div>
          <div className="flex gap-2 items-center">
             <span className="w-16"></span>
             <input 
              value={clientInfo.addressLine2}
              onChange={(e) => setClientInfo({...clientInfo, addressLine2: e.target.value})}
              className="w-full text-gray-600 border-none focus:ring-0 p-0 placeholder-gray-300"
              placeholder="City, State, Zip"
            />
          </div>
        </div>

        {/* Dynamic Items Table */}
        <div className="mb-8">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b-2 border-gray-800">
                <th className="w-[50%] text-left py-2 text-sm font-bold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="w-[15%] text-center py-2 text-sm font-bold text-gray-600 uppercase tracking-wider">Qty</th>
                <th className="w-[15%] text-right py-2 text-sm font-bold text-gray-600 uppercase tracking-wider">Unit Price</th>
                <th className="w-[15%] text-right py-2 text-sm font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="w-[5%] py-2 no-print"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 group">
                  <td className="py-4 pr-4 align-top">
                    <textarea 
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full resize-none bg-transparent border-none focus:ring-0 p-0 text-gray-800 font-medium"
                      rows={2}
                      placeholder="Service or Product Description"
                    />
                  </td>
                  <td className="py-4 px-2 align-top text-center">
                    <input 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full text-center bg-transparent border-none focus:ring-0 p-0 text-gray-600"
                    />
                  </td>
                  <td className="py-4 px-2 align-top text-right">
                    <div className="flex justify-end items-center">
                      <span className="text-gray-400 mr-1">$</span>
                      <input 
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-24 text-right bg-transparent border-none focus:ring-0 p-0 text-gray-600"
                      />
                    </div>
                  </td>
                  <td className="py-4 pl-2 align-top text-right font-semibold text-gray-800">
                    {formatCurrency(item.quantity * item.price)}
                  </td>
                  <td className="py-4 pl-2 align-top text-center no-print">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      title="Remove Line Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button 
            onClick={addItem}
            className="no-print mt-4 flex items-center gap-2 text-[#0ABAB5] text-sm font-bold hover:text-[#089a96] transition-colors"
          >
            <Plus size={16} /> Add Line Item
          </button>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-12">
          <div className="w-1/2 md:w-5/12">
            <div className="flex justify-between py-2 text-gray-600">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 text-gray-600 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="font-medium">Sales Tax</span>
                <div className="flex items-center bg-gray-50 rounded px-2 py-0.5 no-print">
                  <input 
                    type="number" 
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-10 bg-transparent border-none text-right text-xs p-0 focus:ring-0"
                  />
                  <span className="text-xs text-gray-500">%</span>
                </div>
                <span className="text-xs text-gray-400 print:inline hidden">({taxRate}%)</span>
              </div>
              <span className="font-semibold">{formatCurrency(taxAmount)}</span>
            </div>

            <div className="flex justify-between py-4 text-xl">
              <span className="font-bold text-gray-800">TOTAL</span>
              <span className="font-bold text-black">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Footer / Banking Info */}
        <div className="mt-auto border-t-2 border-gray-100 pt-8 flex flex-col md:flex-row justify-between gap-8">
          
          {/* Payment Instructions */}
          <div className="w-full md:w-1/2">
            <h4 className="text-[#0ABAB5] font-bold tracking-widest text-sm mb-4 uppercase">Pay To:</h4>
            
            <div className="grid grid-cols-[100px_1fr] gap-y-1 text-sm text-gray-600">
              <span className="font-semibold">Bank:</span>
              <input 
                value={bankInfo.bankName}
                onChange={(e) => setBankInfo({...bankInfo, bankName: e.target.value})}
                className="bg-transparent border-none p-0 text-gray-800 focus:ring-0"
              />
              
              <span className="font-semibold">Account Name:</span>
              <input 
                value={bankInfo.accountName}
                onChange={(e) => setBankInfo({...bankInfo, accountName: e.target.value})}
                className="bg-transparent border-none p-0 text-gray-800 focus:ring-0"
              />
              
              <span className="font-semibold">Account #:</span>
              <input 
                value={bankInfo.accountNumber}
                onChange={(e) => setBankInfo({...bankInfo, accountNumber: e.target.value})}
                className="bg-transparent border-none p-0 text-gray-800 focus:ring-0"
              />
              
              <span className="font-semibold">Routing #:</span>
              <input 
                value={bankInfo.routingNumber}
                onChange={(e) => setBankInfo({...bankInfo, routingNumber: e.target.value})}
                className="bg-transparent border-none p-0 text-gray-800 focus:ring-0"
              />
            </div>
          </div>

          {/* Company Contact Bottom */}
          <div className="w-full md:w-1/2 text-right flex flex-col justify-end">
             <input 
                value={senderInfo.name}
                onChange={(e) => setSenderInfo({...senderInfo, name: e.target.value})}
                className="text-right text-lg font-bold text-gray-800 uppercase border-none focus:ring-0 p-0 mb-1"
              />
              <input 
                value={senderInfo.address}
                onChange={(e) => setSenderInfo({...senderInfo, address: e.target.value})}
                className="text-right text-sm text-gray-500 border-none focus:ring-0 p-0"
              />
              <div className="flex justify-end items-center gap-2 text-sm text-gray-500 mt-1">
                 <span className="font-semibold text-[#0ABAB5]">|</span>
                 <input 
                  value={senderInfo.phone}
                  onChange={(e) => setSenderInfo({...senderInfo, phone: e.target.value})}
                  className="text-right border-none focus:ring-0 p-0 w-24"
                />
              </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[8.5in] mx-auto mt-4 text-center text-gray-400 text-sm">
        <p>Edit the fields directly on the invoice above. Click "Download PDF" when ready.</p>
      </div>

    </div>
  );
};

export default InvoiceGenerator;