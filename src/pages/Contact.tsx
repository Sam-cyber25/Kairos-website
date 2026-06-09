import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Loader2, CheckCircle } from 'lucide-react';
import InstagramIcon from '../components/ui/InstagramIcon';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import styles from './Contact.module.css';

const contactSchema = z.object({
  name: z.string().min(2, 'Your name helps us know who to reply to.'),
  businessName: z.string().min(1, 'We\'d love to know your business name.'),
  phone: z.string().min(10, 'A phone number helps us reach you on WhatsApp.'),
  service: z.enum(['new-website', 'redesign', 'maintenance', 'not-sure'], {
    errorMap: () => ({ message: 'Pick whichever fits best.' }),
  }),
  message: z.string().min(20, 'Tell us a little more about your business, at least 20 characters.'),
});

type ContactForm = z.infer<typeof contactSchema>;

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactForm) => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Simulate success — wire to Formspree/EmailJS in production
    setStatus('success');
  };

  return (
    <PageTransition>
      <main id="main-content" className={styles.page}>

        <div className={styles.layout}>
          {/* === LEFT PANEL === */}
          <div className={styles.leftPanel} role="complementary" aria-label="Contact information" data-cursor-theme="dark">
            <div className={styles.leftContent}>
              <h1 className={styles.leftHeading}>Let's build something.</h1>
              <p className={styles.leftSubtext}>
                Tell us about your business. We will tell you exactly how we can help.
              </p>

              <ul className={styles.contactList}>
                <li>
                  <a
                    href="mailto:kairosbuilds.in@gmail.com"
                    className={styles.contactItem}
                    aria-label="Email us"
                  >
                    <Mail size={18} strokeWidth={2} className={styles.contactIcon} aria-hidden="true" />
                    kairosbuilds.in@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.contactItem} ${styles.whatsapp}`}
                    aria-label="Message us on WhatsApp"
                  >
                    <MessageCircle size={18} strokeWidth={2} className={styles.contactIcon} aria-hidden="true" />
                    WhatsApp us
                  </a>
                </li>
                <li>
                  <span className={styles.contactItem}>
                    <MapPin size={18} strokeWidth={2} className={styles.contactIcon} aria-hidden="true" />
                    Kanpur, Uttar Pradesh, India
                  </span>
                </li>
                <li>
                  <a
                    href="https://instagram.com/kairosbuilds.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactItem}
                    aria-label="Kairos on Instagram"
                  >
                    <InstagramIcon size={18} strokeWidth={2} className={styles.contactIcon} aria-hidden="true" />
                    @kairosbuilds.in
                  </a>
                </li>
              </ul>

              <div className={styles.replyBadge} role="status" aria-live="polite">
                <span className={styles.replyDot} aria-hidden="true" />
                We reply within 24 hours.
              </div>
            </div>
          </div>

          {/* === RIGHT PANEL === */}
          <div className={styles.rightPanel}>
            <div className={styles.formWrap}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className={styles.successState}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      className={styles.successIcon}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle size={48} strokeWidth={1.5} className={styles.checkGreen} aria-hidden="true" />
                    </motion.div>
                    <h2 className={styles.successHeading}>Message sent.</h2>
                    <p className={styles.successText}>
                      We will be in touch within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    aria-label="Contact form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className={styles.formHeading}>Tell us about your project</h2>

                    {/* Name */}
                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.label}>Your Name</label>
                      <input
                        id="name"
                        type="text"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        {...register('name')}
                      />
                      {errors.name && (
                        <span id="name-error" className={styles.error} role="alert">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Business Name */}
                    <div className={styles.field}>
                      <label htmlFor="businessName" className={styles.label}>Business Name</label>
                      <input
                        id="businessName"
                        type="text"
                        className={`${styles.input} ${errors.businessName ? styles.inputError : ''}`}
                        autoComplete="organization"
                        aria-required="true"
                        aria-invalid={!!errors.businessName}
                        aria-describedby={errors.businessName ? 'business-error' : undefined}
                        {...register('businessName')}
                      />
                      {errors.businessName && (
                        <span id="business-error" className={styles.error} role="alert">
                          {errors.businessName.message}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className={styles.field}>
                      <label htmlFor="phone" className={styles.label}>
                        Phone Number
                        <span className={styles.helper}>WhatsApp preferred</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <span id="phone-error" className={styles.error} role="alert">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    {/* Service */}
                    <div className={styles.field}>
                      <label htmlFor="service" className={styles.label}>What do you need?</label>
                      <select
                        id="service"
                        className={`${styles.select} ${errors.service ? styles.inputError : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                        {...register('service')}
                      >
                        <option value="">Select one</option>
                        <option value="new-website">New Website</option>
                        <option value="redesign">Redesign</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="not-sure">Not Sure Yet</option>
                      </select>
                      {errors.service && (
                        <span id="service-error" className={styles.error} role="alert">
                          {errors.service.message}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className={styles.field}>
                      <label htmlFor="message" className={styles.label}>Tell us about your business</label>
                      <textarea
                        id="message"
                        rows={4}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        {...register('message')}
                      />
                      {errors.message && (
                        <span id="message-error" className={styles.error} role="alert">
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={status === 'loading'}
                      aria-busy={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} strokeWidth={2} className={styles.spinner} aria-hidden="true" />
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </button>

                    {status === 'error' && (
                      <p className={styles.formError} role="alert">
                        Something went wrong. Email us directly at kairosbuilds.in@gmail.com
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
