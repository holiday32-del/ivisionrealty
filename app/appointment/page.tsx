import type { Metadata } from "next";
import { breadcrumbSchema, pageOpenGraph } from "../seo";
import { SiteShell } from "../site-shell";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = {
  title: "Appointment Booking",
  description: "Request an appointment with IVISION Realty Corp about buying, selling, property management, or real estate resources.",
  alternates: { canonical: "/appointment" },
  openGraph: pageOpenGraph("Appointment Booking | IVISION Realty Corp", "Request a preferred appointment day and time with IVISION Realty.", "/appointment"),
};

export default function AppointmentPage() {
  return (
    <SiteShell>
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Appointment Booking", path: "/appointment" }])} />
      <main className="legalMain">
        <section className="pathHero"><div className="shell"><p className="eyebrow">Appointment booking</p><h1>Choose a preferred day and time.</h1><p>Send an appointment request and the IVISION Realty team will follow up using the contact information you provide.</p></div></section>
        <section className="appointmentPanel shell">
          <form action="mailto:info@ivisionrealtycorp.com" method="post" encType="text/plain">
            <div className="fieldRow"><label>First name<input name="First name" autoComplete="given-name" required /></label><label>Last name<input name="Last name" autoComplete="family-name" required /></label></div>
            <label>Email address<input type="email" name="Email" autoComplete="email" required /></label>
            <label>Phone number<input type="tel" name="Phone" autoComplete="tel" /></label>
            <div className="fieldRow"><label>Preferred date<input type="date" name="Preferred date" required /></label><label>Preferred time<input type="time" name="Preferred time" required /></label></div>
            <label>Topic<select name="Topic" defaultValue=""><option value="" disabled>Select a topic</option><option>Buying real estate</option><option>Selling real estate</option><option>Property management</option><option>Property or land search</option><option>Funding information through New Wide Lending</option><option>Other</option></select></label>
            <label>Notes<textarea name="Notes" rows={5} /></label>
            <button className="button buttonDark" type="submit">Send appointment request</button>
            <p className="formNote">Submitting opens your email app so you can review and send the request. Your preferred time is not confirmed until the IVISION Realty team responds.</p>
          </form>
        </section>
      </main>
    </SiteShell>
  );
}
