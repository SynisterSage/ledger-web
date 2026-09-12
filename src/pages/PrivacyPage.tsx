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

        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">Local device data</h3>
        <p>
          Some Ledger features store information on the device where you use them rather than in your Ledger workspace.
          This may include files you add to Files &amp; links, temporary Ask Ledger attachments or sessions, downloaded
          local models, locally captured audio, recordings, and processing artifacts. Device-local data is not
          automatically available on your other devices or included in workspace synchronization.
        </p>
        <p>
          You control available local retention settings in Ledger. Depending on the feature and your selected setting,
          local copies may be removed automatically or when you use the applicable delete or remove control. Removing
          a local copy does not necessarily remove the original file or a separate workspace record or external link.
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
    id: 'ai-and-ocr',
    title: '5. AI, OCR, and transcription',
    content: (
      <>
        <p>
          Ledger may provide optional AI, image-to-text, and speech-to-text features. Some processing can happen on
          your device using downloaded or platform-provided models and OCR services, such as local language models,
          Apple Vision, PaddleOCR, or Whisper-based transcription. When processing stays on your device, the relevant
          input is not sent to Ledger for that processing, although the resulting note, transcript, or other content
          may be saved to your workspace if you choose to do so.
        </p>
        <p>
          Ledger may also allow you to connect your own API key for a third-party AI provider. If you select that
          provider, the content needed for your request, which may include workspace context, attachments, images, or
          transcripts, is sent directly to that provider through Ledger. The provider may process that content under its
          own terms and privacy policy. Review the provider’s terms, privacy policy, and retention controls before
          connecting a key. Ledger does not control a provider’s processing or retention practices.
        </p>
        <p>
          AI, OCR, and transcription results may be incomplete or inaccurate. Review generated text before relying on
          it or saving it to a workspace.
        </p>
      </>
    ),
  },
  {
    id: 'meeting-recordings',
    title: '6. Meetings and recordings',
    content: (
      <>
        <p>
          If you use meeting features, Ledger may access your microphone or system audio after you grant the required
          device permission and start the feature. Ledger may create local audio recordings, audio chunks, transcript
          segments, meeting notes, and summaries. The exact data retained depends on your settings and the actions you
          take after recording.
        </p>
        <p>
          Do not record, transcribe, or share another person’s conversation unless you have obtained any consent or
          provided any notice required by applicable law and the circumstances of the meeting. You are responsible for
          choosing the audio sources, reviewing the recording indicator, and deleting recordings or transcripts you no
          longer need.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: '7. How we share information',
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
    title: '8. Data retention',
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
    title: '9. Security',
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
    title: '10. Your choices',
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
    title: '11. Account deletion',
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
    title: "12. Children's privacy",
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
    title: '13. International users',
    content: (
      <p>
        Ledger may process information in the United States or other countries where our service providers operate. By
        using Ledger, you understand that your information may be processed outside your location.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '14. Changes to this Privacy Policy',
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
    title: '15. Contact us',
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
      updatedAt="September 11, 2026"
      sections={privacySections}
    />
  )
}
