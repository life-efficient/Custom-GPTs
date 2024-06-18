import Link from "next/link";
import { getSEOTags } from "@/utils/generic/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Privacy Policy

Effective Date: June 18, 2024

1. Introduction

Welcome to Huge Platform (“we,” “our,” “us”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website hugeplatform.vercel.app (the “Site”).

2. Information We Collect

We collect the following information from users of our Site:

Name
Email address
Payment information
Additionally, we use web cookies to collect non-personal data to enhance your experience on our Site.

3. Purpose of Data Collection

The information we collect is used for the following purposes:

Order processing
4. Data Sharing

We do not share your data with any other parties.

5. Children's Privacy

We do not knowingly collect any data from children. If we become aware that we have collected data from children, we will take steps to delete such information from our records.

6. Updates to this Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Users will be notified of any significant changes via email.

7. Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at:

Email: harryaberg@gmail.com
For more information, please visit our Terms of Service at hugeplatform.vercel.app/tos.`
            // 6. Contact Information

            // If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:

            // Email: marc@shipfa.st

            // For all other inquiries, please visit our Contact Us page on the Website.

            // By using ShipFast, you consent to the terms of this Privacy Policy.

          }
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
