/**
 * Sends the contact message through Scaleway Transactional Email, which
 * processes it in the EU. The visitor's address goes in Reply-To, never From:
 * we can only send from our own verified domain.
 */
export const createScalewayMailer = ({
  scalewaySecretKey,
  scalewayProjectId,
  scalewayRegion,
  from,
  to,
  fetch = globalThis.fetch,
}) => ({
  async sendContactMessage({ name, email, company, message, locale }) {
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || '-'}`,
      `Locale: ${locale}`,
      '',
      message,
    ];
    const res = await fetch(
      `https://api.scaleway.com/transactional-email/v1alpha1/regions/${scalewayRegion}/emails`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-auth-token': scalewaySecretKey,
        },
        body: JSON.stringify({
          project_id: scalewayProjectId,
          from: { email: from, name: 'monad.systems contact form' },
          to: [{ email: to }],
          subject: `Contact form: ${name}${company ? ` (${company})` : ''}`,
          text: lines.join('\n'),
          additional_headers: [{ key: 'Reply-To', value: email }],
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Scaleway TEM responded ${res.status}: ${body.slice(0, 500)}`);
    }
  },
});
