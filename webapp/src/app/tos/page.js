import Link from "next/link";
import { getSEOTags } from "@/utils/generic/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Terms of Service

Effective Date: June 18, 2024

Welcome to Huge Platform! By accessing or using our website (hugeplatform.vercel.app), you agree to comply with and be bound by the following terms and conditions. Please review them carefully.

Acceptance of Terms
By using our services, you agree to these Terms of Service and our Privacy Policy (hugeplatform.vercel.app/privacy-policy). If you do not agree with these terms, please do not use our services.

Services Provided
Huge Platform provides AI employees that help business owners perform common tasks outside of their core competency.

Ownership
Huge Platform owns all the software that powers the AI employees. Users are granted a limited, non-exclusive, non-transferable license to use the services provided.

User Data Collection
We collect name, email, and payment information from our users. No other personal data is collected.

Non-Personal Data Collection
We use web cookies to collect non-personal data to improve user experience and site performance.

Refund Policy
Huge Platform is not entitled to provide any refunds for the services rendered.

Contact Information
If you have any questions about these Terms of Service, please contact us at harryaberg@gmail.com.

Governing Law
These terms shall be governed by and construed in accordance with the laws of the UK.

Updates to the Terms
We reserve the right to update these terms at any time. Users will be notified of any changes via email.

By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.

Thank you for choosing Huge Platform!`

            // 6. Updates to the Terms

            // We may update these Terms from time to time. Users will be notified of any changes via email.

            // For any questions or concerns regarding these Terms of Service, please contact us at marc@shipfa.st.

          }

        </pre>
      </div>
    </main>
  );
};

export default TOS;
