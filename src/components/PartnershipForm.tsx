import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const objectives = [
  'Brand awareness',
  'Product proof',
  'Employee engagement',
  'Customer activation',
  'Lebanese/diaspora positioning',
  'Media/strategic partnership',
  'Other'
];

const supportTypes = [
  'Lead the mission',
  'Back one continent',
  'Fund a real cost',
  'Provide a product/service',
  'Distribution/media',
  'Not sure yet'
];

interface FormData {
  name: string;
  email: string;
  company: string;
  website: string;
  objective: string;
  support: string;
  market: string;
  message: string;
}

export function PartnershipForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    objective: '',
    support: '',
    market: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.objective) newErrors.objective = 'Please select an objective';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setStatus('submitting');
    
    // In production, this would send to an API endpoint
    // For now, we'll create a mailto link as fallback
    try {
      const subject = encodeURIComponent(`Six Continents World Record Partnership: ${formData.company}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Website: ${formData.website || 'Not provided'}
Objective: ${formData.objective}
Support Type: ${formData.support || 'Not specified'}
Market: ${formData.market || 'Not specified'}

Message:
${formData.message || 'No additional message'}
      `);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open mailto link
      window.location.href = `mailto:hello@toufic.co?subject=${subject}&body=${body}`;
      
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-400" size={32} />
        </div>
        <h3 className="text-2xl font-medium mb-4">Inquiry Received</h3>
        <p className="text-muted max-w-md mx-auto">
          Your goal comes first. Toufic will use these answers to shape the exact partnership route, 
          deliverables, rights, and next conversation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="contact">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'border-lebanese-red' : ''}
            placeholder="Your name"
          />
          {errors.name && <p className="text-lebanese-red text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Work Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-lebanese-red' : ''}
            placeholder="you@company.com"
          />
          {errors.email && <p className="text-lebanese-red text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company">Company *</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'border-lebanese-red' : ''}
            placeholder="Company name"
          />
          {errors.company && <p className="text-lebanese-red text-xs mt-1">{errors.company}</p>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website">Company Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://company.com"
          />
        </div>
      </div>

      {/* Objective */}
      <div>
        <label htmlFor="objective">What is your main objective? *</label>
        <select
          id="objective"
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          className={errors.objective ? 'border-lebanese-red' : ''}
        >
          <option value="">Select an objective</option>
          {objectives.map(obj => (
            <option key={obj} value={obj}>{obj}</option>
          ))}
        </select>
        {errors.objective && <p className="text-lebanese-red text-xs mt-1">{errors.objective}</p>}
      </div>

      {/* Support type */}
      <div>
        <label htmlFor="support">How could the company support?</label>
        <select
          id="support"
          name="support"
          value={formData.support}
          onChange={handleChange}
        >
          <option value="">Select support type</option>
          {supportTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Market */}
      <div>
        <label htmlFor="market">Main market or audience</label>
        <input
          type="text"
          id="market"
          name="market"
          value={formData.market}
          onChange={handleChange}
          placeholder="e.g., Lebanon, Middle East, Global"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message">Additional Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us more about your company and what you're looking to achieve..."
        />
      </div>

      {/* Privacy notice */}
      <p className="text-xs text-muted">
        Your information will be used only to discuss partnership opportunities. 
        We do not share your data with third parties.
      </p>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn btn-primary"
        >
          {status === 'submitting' ? (
            <>
              <span className="animate-spin">⏳</span>
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Request a Partner Role
            </>
          )}
        </button>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-lebanese-red text-sm"
            >
              <AlertCircle size={16} />
              <span>Something went wrong. Please try again.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

// Quick partnership configurator
export function PartnershipConfigurator() {
  const [objective, setObjective] = useState('');
  const [support, setSupport] = useState('');

  const getRecommendation = () => {
    if (!objective || !support) return null;

    const recommendations: Record<string, Record<string, string>> = {
      'Brand awareness': {
        'Lead the mission': 'Lead Mission Partner with full campaign naming, category exclusivity, and recurring original content.',
        'Back one continent': 'Continent Partner with chapter ownership, race-week integration, and dedicated content package.',
        'Fund a real cost': 'Barrier Partner with specific cost ownership, branded proof, and campaign credit.',
        'Provide a product/service': 'Technical Partner with real-condition product testing, documented use, and athlete endorsement.',
        'Distribution/media': 'Media Partner with content distribution rights, co-branded assets, and campaign amplification.',
        'Not sure yet': 'Custom partnership route based on your specific brand goals and available resources.'
      },
      'Product proof': {
        'Lead the mission': 'Lead Technical Partner with exclusive equipment integration across all six continents.',
        'Back one continent': 'Chapter Technical Partner with intensive product testing in race conditions.',
        'Fund a real cost': 'Equipment Partner with specific barrier ownership and documented product performance.',
        'Provide a product/service': 'Product Integration Partner with real-use documentation and athlete feedback.',
        'Distribution/media': 'Product Story Partner with content rights and case study development.',
        'Not sure yet': 'Custom technical partnership based on product category and testing requirements.'
      },
      'Employee engagement': {
        'Lead the mission': 'Mission Partner with internal campaign activation, founder athlete talks, and team challenges.',
        'Back one continent': 'Continent Partner with regional team engagement and chapter-specific challenges.',
        'Fund a real cost': 'Barrier Partner with specific ownership story for employee communication.',
        'Provide a product/service': 'Service Partner with employee benefit integration and wellness alignment.',
        'Distribution/media': 'Content Partner with internal communication assets and engagement materials.',
        'Not sure yet': 'Custom engagement partnership based on team size, locations, and culture goals.'
      },
      'Customer activation': {
        'Lead the mission': 'Lead Mission Partner with customer journey integration, exclusive content, and campaign access.',
        'Back one continent': 'Continent Partner with regional customer activations and chapter exclusives.',
        'Fund a real cost': 'Barrier Partner with customer-facing proof and community integration.',
        'Provide a product/service': 'Customer Experience Partner with real-condition testing and testimonials.',
        'Distribution/media': 'Distribution Partner with customer-facing content and activation materials.',
        'Not sure yet': 'Custom activation partnership based on customer base and engagement goals.'
      },
      'Lebanese/diaspora positioning': {
        'Lead the mission': 'Origin Partner with Lebanese identity integration, diaspora engagement, and cultural positioning.',
        'Back one continent': 'Regional Partner with market-specific Lebanese story and community connection.',
        'Fund a real cost': 'Foundation Partner with Lebanese barrier ownership and origin story credit.',
        'Provide a product/service': 'Lebanese Excellence Partner with local product integration and national pride.',
        'Distribution/media': 'Lebanese Story Partner with diaspora media and regional distribution.',
        'Not sure yet': 'Custom Lebanese partnership based on market presence and community goals.'
      },
      'Media/strategic partnership': {
        'Lead the mission': 'Exclusive Media Partner with full campaign access, production rights, and first-access content.',
        'Back one continent': 'Chapter Media Partner with dedicated continent coverage and exclusive access.',
        'Fund a real cost': 'Production Partner with specific documentation ownership and content rights.',
        'Provide a product/service': 'Platform Partner with content hosting, distribution, and audience access.',
        'Distribution/media': 'Distribution Network Partner with multi-platform reach and campaign amplification.',
        'Not sure yet': 'Custom media partnership based on platform, format, and distribution goals.'
      },
      'Other': {
        'Lead the mission': 'Custom Lead Partnership with tailored positioning and deliverables.',
        'Back one continent': 'Custom Continent Partnership with flexible chapter integration.',
        'Fund a real cost': 'Custom Barrier Partnership with specific cost ownership.',
        'Provide a product/service': 'Custom Product Partnership with integration based on category.',
        'Distribution/media': 'Custom Distribution Partnership with platform-specific execution.',
        'Not sure yet': 'Open discussion to explore the best partnership structure for your goals.'
      }
    };

    return recommendations[objective]?.[support] || 'Custom partnership route based on your specific goals and resources.';
  };

  const recommendation = getRecommendation();

  return (
    <div className="card-elevated p-8">
      <h3 className="text-xl font-medium mb-6">Find the Clearest Partner Role</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted mb-2">
            What business result matters most?
          </label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full"
          >
            <option value="">Select objective</option>
            {objectives.map(obj => (
              <option key={obj} value={obj}>{obj}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-muted mb-2">
            How would you prefer to support?
          </label>
          <select
            value={support}
            onChange={(e) => setSupport(e.target.value)}
            className="w-full"
          >
            <option value="">Select support type</option>
            {supportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {recommendation && (
          <motion.div
            key={`${objective}-${support}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-ink-panel rounded-lg border border-lebanese-red/20"
          >
            <div className="text-xs text-lebanese-red uppercase tracking-wider mb-2">
              Recommended Route
            </div>
            <p className="text-lg">{recommendation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
