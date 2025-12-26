import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, HelpCircle, ChevronRight } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "Can I use the POS system offline?",
      answer: "Yes! Our POS system works completely offline. All data syncs automatically when you're back online, ensuring uninterrupted business operations even during internet outages."
    },
 
    {
      question: "What kind of support is available?",
      answer: "We provide 24x7 customer support via phone, email, and live chat. Our dedicated support team is always ready to assist you with any questions or issues you might encounter."
    },
    {
      question: "Can I manage multiple branches or stores?",
      answer: "Yes! Our multi-store management feature allows you to control all your locations from one centralized dashboard. You can manage inventory, track sales, and analyze performance across all your branches."
    },
    {
      question: "How secure is my business data?",
      answer: "We implement bank-level security measures including end-to-end encryption, secure cloud storage, regular backups, and strict access controls to ensure your business data remains completely safe and protected."
    },
    {
      question: "Can I customize receipts and invoices?",
      answer: "Yes, you can fully customize your receipts and invoices with your business logo, contact information, terms and conditions, and special offers or promotions. The system also supports multiple languages and currencies."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we offer mobile apps for both iOS and Android devices. The mobile app allows you to manage your business on the go, check sales reports, update inventory, and receive important notifications."
    },
    {
      question: "How easy is it to train new staff?",
      answer: "Our system is designed with user-friendliness in mind. New staff can typically learn the basics within 30 minutes. We also provide comprehensive training materials, video tutorials, and a guided onboarding process."
    },
  ];

  const supportOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone Support",
      description: "Talk to our experts",
      action: "+255 7 6716 7178",
      buttonText: "Call Now"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "Get answers by email",
      action: "support@pesaflow.com",
      buttonText: "Send Email"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Live Chat",
      description: "Chat with our team",
      action: "Available 24/7",
      buttonText: "Start Chat"
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help Center",
      description: "Browse our resources",
      action: "Guides & Tutorials",
      buttonText: "Visit Help Center"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-black" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-primary dark:text-primary">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about our POS system. Can't find the answer you're looking for? 
            Please chat with our friendly team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side - FAQs */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-100 dark:border-gray-700">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
              <Button variant="outline" className="group dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                Contact Our Support Team
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right Side - Support Options */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-transparent dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Support Options</h3>
              
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700/50 rounded-lg p-4 shadow-sm border border-transparent dark:border-gray-600">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{option.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{option.description}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">{option.action}</p>
                        <Button variant="outline" size="sm" className="w-full justify-center dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                          {option.buttonText}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/10 dark:border-primary/20">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sunday:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;