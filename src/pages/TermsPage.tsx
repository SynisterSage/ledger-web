import { LockedSplash } from '../components/sections/LockedSplash'
import { LegalPage } from '../components/sections/LegalPage'
import { isSiteLocked } from '../lib/siteLock'

const termsSections = [
  {
    id: 'about-ledger',
    title: '1. About Ledger',
    content: (
      <>
        <p>
          Ledger is a workspace application for managing notes, tasks, reminders, events, projects, captures,
          notifications, and related context across devices.
        </p>
        <p>
          Ledger is designed to help you organize information and take action, but you are responsible for reviewing,
          managing, and completing your own tasks, reminders, events, and projects.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    content: (
      <>
        <p>You must be at least 13 years old, or the minimum age required in your jurisdiction, to use Ledger.</p>
        <p>
          If you use Ledger on behalf of an organization, you represent that you have authority to accept these Terms
          on behalf of that organization.
        </p>
      </>
    ),
  },
  {
    id: 'your-account',
    title: '3. Your account',
    content: (
      <>
        <p>You may need an account to use Ledger.</p>
        <p>You agree to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide accurate account information</li>
          <li>Keep your login credentials secure</li>
          <li>Notify us of unauthorized access</li>
          <li>Be responsible for activity under your account</li>
        </ul>
        <p>We are not responsible for losses caused by your failure to keep your account secure.</p>
      </>
    ),
  },
  {
    id: 'workspaces-and-content',
    title: '4. Workspaces and content',
    content: (
      <>
        <p>
          Ledger allows you to create, store, sync, and manage content, including notes, tasks, reminders, events,
          projects, captures, and workspace data.
        </p>
        <p>You retain ownership of the content you create or upload.</p>
        <p>
          By using Ledger, you grant us a limited license to host, store, process, transmit, display, and otherwise
          use your content only as needed to provide, secure, support, and improve Ledger.
        </p>
        <p>
          You are responsible for your content and for ensuring that you have the rights needed to store or share it
          through Ledger.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: '5. Acceptable use',
    content: (
      <>
        <p>You agree not to use Ledger to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Violate any law or regulation</li>
          <li>Infringe intellectual property or privacy rights</li>
          <li>Upload malicious code or interfere with Ledger’s systems</li>
          <li>Attempt unauthorized access to accounts, workspaces, systems, or data</li>
          <li>Harass, abuse, threaten, or harm others</li>
          <li>Store or distribute unlawful, harmful, or deceptive content</li>
          <li>Reverse engineer or misuse Ledger except where permitted by law</li>
          <li>Use Ledger in a way that could damage, disable, or impair the service</li>
        </ul>
        <p>We may suspend or terminate access if we believe these Terms are violated.</p>
      </>
    ),
  },
  {
    id: 'integrations',
    title: '6. Integrations and third-party services',
    content: (
      <>
        <p>
          Ledger may connect with third-party services, such as Slack, browser extensions, calendar services, or other
          tools.
        </p>
        <p>Your use of third-party services is governed by their own terms and privacy policies.</p>
        <p>We are not responsible for third-party services, their content, or their practices.</p>
      </>
    ),
  },
  {
    id: 'notifications',
    title: '7. Notifications and reminders',
    content: (
      <>
        <p>
          Ledger may provide reminders, notifications, calendar alerts, project updates, and similar features.
        </p>
        <p>
          These features are provided for convenience only. We do not guarantee that notifications, reminders, or
          alerts will be delivered, accurate, timely, or uninterrupted.
        </p>
        <p>
          You are responsible for independently managing important deadlines, appointments, obligations, and
          commitments.
        </p>
      </>
    ),
  },
  {
    id: 'availability',
    title: '8. Availability and changes',
    content: (
      <>
        <p>We may modify, update, suspend, or discontinue Ledger or any feature at any time.</p>
        <p>We do not guarantee that Ledger will always be available, uninterrupted, secure, or error-free.</p>
      </>
    ),
  },
  {
    id: 'beta-features',
    title: '9. Beta or experimental features',
    content: (
      <>
        <p>
          Ledger may offer beta, experimental, or preview features. These features may be incomplete, unreliable, or
          changed without notice.
        </p>
        <p>Use beta features at your own risk.</p>
      </>
    ),
  },
  {
    id: 'fees',
    title: '10. Fees and subscriptions',
    content: (
      <>
        <p>Some Ledger features may be free, and others may require payment.</p>
        <p>
          If paid features are offered, pricing, billing terms, renewal terms, cancellation, and refund rules will be
          provided at the time of purchase or in the applicable app store or billing platform.
        </p>
        <p>
          If you purchase through Apple App Store or another third-party platform, that platform’s payment and refund
          terms may apply.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '11. Intellectual property',
    content: (
      <>
        <p>
          Ledger, including its software, design, branding, logos, website, and related materials, is owned by us or
          our licensors.
        </p>
        <p>These Terms do not give you ownership of Ledger or our intellectual property.</p>
        <p>
          You may not copy, modify, distribute, sell, lease, or create derivative works from Ledger except as permitted
          by these Terms or applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'feedback',
    title: '12. Feedback',
    content: (
      <p>
        If you send us feedback, ideas, suggestions, or feature requests, you allow us to use them without restriction
        or compensation to you.
      </p>
    ),
  },
  {
    id: 'termination',
    title: '13. Termination',
    content: (
      <>
        <p>You may stop using Ledger at any time.</p>
        <p>We may suspend or terminate your access if:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>You violate these Terms</li>
          <li>Your use creates risk or potential legal exposure</li>
          <li>We are required to do so by law</li>
          <li>We discontinue the service</li>
        </ul>
        <p>
          After termination, some provisions of these Terms will continue, including ownership, disclaimers, limitations
          of liability, and dispute terms.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: '14. Disclaimer',
    content: (
      <>
        <p>Ledger is provided “as is” and “as available.”</p>
        <p>
          To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties
          of merchantability, fitness for a particular purpose, title, and non-infringement.
        </p>
        <p>
          We do not guarantee that Ledger will meet your requirements, be uninterrupted, be error-free, or that content
          will always be available or preserved.
        </p>
      </>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: '15. Limitation of liability',
    content: (
      <>
        <p>
          To the fullest extent permitted by law, Ledger and its owners, employees, contractors, affiliates, and
          service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive
          damages, or for lost profits, lost data, lost business, or loss of goodwill.
        </p>
        <p>To the fullest extent permitted by law, our total liability for any claim related to Ledger will not exceed the greater of:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>the amount you paid to use Ledger in the 12 months before the claim, or</li>
          <li>$100</li>
        </ul>
        <p>Some jurisdictions do not allow certain limitations, so some of these limitations may not apply to you.</p>
      </>
    ),
  },
  {
    id: 'indemnification',
    title: '16. Indemnification',
    content: (
      <>
        <p>
          You agree to defend, indemnify, and hold harmless Ledger and its owners, employees, contractors, affiliates,
          and service providers from claims, damages, liabilities, losses, and expenses arising from:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>your use of Ledger</li>
          <li>your content</li>
          <li>your violation of these Terms</li>
          <li>your violation of law or third-party rights</li>
        </ul>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '17. Governing law',
    content: (
      <>
        <p>
          These Terms are governed by the laws that apply to Ledger Workspace, without regard to conflict of law
          principles.
        </p>
        <p>
          Any disputes will be resolved in the courts that have jurisdiction over Ledger Workspace, unless applicable
          law requires otherwise.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '18. Changes to these Terms',
    content: (
      <>
        <p>We may update these Terms from time to time.</p>
        <p>
          If we make material changes, we will update the “Last updated” date and may provide additional notice.
        </p>
        <p>Your continued use of Ledger after changes means you accept the updated Terms.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '19. Contact',
    content: (
      <>
        <p>If you have questions about these Terms, contact us:</p>
        <p>
          Ledger Workspace
          <br />
          Email: <a href="mailto:ledgerworkspace@gmail.com">ledgerworkspace@gmail.com</a>
          <br />
          Website: <a href="https://ledgerworkspace.com">https://ledgerworkspace.com</a>
        </p>
      </>
    ),
  },
]

export function TermsPage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <LegalPage
      title="Terms of Service"
      intro="These Terms of Service (“Terms”) govern your access to and use of Ledger Workspace (“Ledger,” “we,” “our,” or “us”), including our desktop app, mobile app, website, browser extension, and related services."
      updatedAt="June 18, 2026"
      sections={termsSections}
    />
  )
}
