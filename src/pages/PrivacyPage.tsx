import { LockedSplash } from '../components/sections/LockedSplash'
import { LegalPage } from '../components/sections/LegalPage'
import { isSiteLocked } from '../lib/siteLock'

const privacySections = [
  {
    id: 'information-we-collect',
    title: '1. Information we collect',
    content: (
      <>
        <p>
          We collect information you provide directly, information created while using Ledger, and limited technical
          information needed to operate and secure the service.
        </p>
        <p>We do not use this information to sell advertising.</p>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Account information</h3>
        <p>When you create or use a Ledger account, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Name</li>
          <li>Email address</li>
          <li>Account login information</li>
          <li>Workspace membership information</li>
          <li>User settings and preferences</li>
        </ul>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Workspace content</h3>
        <p>Ledger stores the content you create, save, or sync through the service, including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Notes</li>
          <li>Tasks</li>
          <li>Reminders</li>
          <li>Events</li>
          <li>Projects</li>
          <li>Project actions</li>
          <li>Inbox captures</li>
          <li>Notification records</li>
          <li>Workspace names and settings</li>
        </ul>
        <p>
          If you connect integrations, such as a browser extension, Slack, calendar tools, or other supported services,
          Ledger may store content you choose to send into Ledger.
        </p>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Device and session information</h3>
        <p>To help operate and secure Ledger, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Device type</li>
          <li>App platform, such as desktop, iOS, Android, web, or browser extension</li>
          <li>App version</li>
          <li>Session metadata</li>
          <li>Approximate last active time</li>
          <li>Basic diagnostic information</li>
        </ul>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Usage and performance information</h3>
        <p>We may collect limited information about how Ledger is used, such as:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Feature usage</li>
          <li>Error logs</li>
          <li>Crash reports</li>
          <li>Performance data</li>
          <li>General interaction events needed to improve reliability</li>
        </ul>
        <p>We use this information to improve Ledger and troubleshoot issues.</p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    title: '2. How we use information',
    content: (
      <>
        <p>We use information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide and operate Ledger</li>
          <li>Sync your workspaces across devices</li>
          <li>Save and display notes, tasks, reminders, events, projects, captures, and notifications</li>
          <li>Authenticate your account</li>
          <li>Maintain security and prevent unauthorized access</li>
          <li>Provide customer support</li>
          <li>Improve app performance and reliability</li>
          <li>Develop new features</li>
          <li>Send service-related messages, such as account, security, or product updates</li>
        </ul>
      </>
    ),
  },
  {
    id: 'notifications',
    title: '3. Notifications',
    content: (
      <>
        <p>
          If you enable notifications, Ledger may send notifications about reminders, tasks, events, project actions,
          deadlines, captures, or other items that need your attention.
        </p>
        <p>You can control notification permissions through your device settings and, where available, Ledger settings.</p>
      </>
    ),
  },
  {
    id: 'integrations',
    title: '4. Integrations',
    content: (
      <>
        <p>
          Ledger may allow you to connect third-party services, such as Slack, browser extensions, calendar services,
          or other tools.
        </p>
        <p>
          When you connect an integration, Ledger only receives the information needed to provide the integration and
          the content you choose to save or sync into Ledger.
        </p>
        <p>Third-party services have their own privacy policies and terms. We are not responsible for their privacy practices.</p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: '5. How we share information',
    content: (
      <>
        <p>We do not sell your personal information.</p>
        <p>We may share information only in the following situations:</p>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Service providers</h3>
        <p>
          We may use trusted service providers to help operate Ledger, such as hosting, authentication, database,
          analytics, crash reporting, email delivery, or support tools. These providers may process information only as
          needed to provide services to us.
        </p>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Legal requirements</h3>
        <p>
          We may disclose information if required by law, court order, subpoena, legal process, or to protect the
          rights, safety, and security of Ledger, our users, or others.
        </p>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Business transfers</h3>
        <p>
          If Ledger is involved in a merger, acquisition, financing, reorganization, sale of assets, or similar
          transaction, information may be transferred as part of that transaction.
        </p>

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">With your direction</h3>
        <p>
          We may share information when you direct us to, such as when you invite members to a workspace or connect an
          integration.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: '6. Data retention',
    content: (
      <>
        <p>
          We retain information for as long as needed to provide Ledger, comply with legal obligations, resolve
          disputes, enforce agreements, and maintain security.
        </p>
        <p>You may delete certain content from your account. Some information may remain in backups or logs for a limited period.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: '7. Security',
    content: (
      <>
        <p>We use reasonable administrative, technical, and organizational safeguards to protect information.</p>
        <p>
          However, no method of transmission or storage is completely secure. We cannot guarantee absolute security.
        </p>
        <p>You are responsible for keeping your account credentials secure and for signing out of devices you no longer use.</p>
      </>
    ),
  },
  {
    id: 'your-choices',
    title: '8. Your choices',
    content: (
      <>
        <p>Depending on your location and applicable law, you may have rights to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access personal information</li>
          <li>Correct inaccurate information</li>
          <li>Delete information</li>
          <li>Export information</li>
          <li>Object to or restrict certain processing</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To make a request, contact us at <a href="mailto:ledgerworkspace@gmail.com">ledgerworkspace@gmail.com</a>.
        </p>
      </>
    ),
  },
  {
    id: 'account-deletion',
    title: '9. Account deletion',
    content: (
      <>
        <p>
          You may request deletion of your account by contacting us at{' '}
          <a href="mailto:ledgerworkspace@gmail.com">ledgerworkspace@gmail.com</a> or by using in-app account deletion
          tools if available.
        </p>
        <p>
          Deleting your account may permanently remove your workspaces and content, subject to any legal, security, or
          backup retention requirements.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: "10. Children's privacy",
    content: (
      <>
        <p>
          Ledger is not intended for children under 13, or the minimum age required in your jurisdiction. We do not
          knowingly collect personal information from children.
        </p>
        <p>
          If you believe a child has provided us personal information, contact us and we will take appropriate steps to
          delete it.
        </p>
      </>
    ),
  },
  {
    id: 'international',
    title: '11. International users',
    content: (
      <p>
        Ledger may process information in the United States or other countries where our service providers operate. By
        using Ledger, you understand that your information may be processed outside your location.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '12. Changes to this Privacy Policy',
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. If we make material changes, we will update the “Last
          updated” date and may provide additional notice.
        </p>
        <p>Your continued use of Ledger after changes means you accept the updated Privacy Policy.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '13. Contact us',
    content: (
      <>
        <p>If you have questions about this Privacy Policy or your information, contact us:</p>
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

export function PrivacyPage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <LegalPage
      title="Privacy Policy"
      intro="Ledger Workspace (“Ledger,” “we,” “our,” or “us”) provides workspace, task, reminder, note, calendar, project, capture, and notification tools across desktop and mobile applications."
      updatedAt="June 18, 2026"
      sections={privacySections}
    />
  )
}
