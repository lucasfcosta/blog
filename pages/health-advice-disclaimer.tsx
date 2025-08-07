import Layout from '../components/Layout';

export default function HealthAdviceDisclaimer() {
  return (
    <Layout 
      title="Health and Medical Advice Disclaimer" 
      description="Health and medical advice disclaimer for Lucas F. Costa's blog"
    >
      <div className="disclaimer">
        <h1>Health and Medical Advice Disclaimer</h1>

        <h2>DISCLAIMER: THIS WEBSITE DOES NOT PROVIDE MEDICAL ADVICE</h2>

        <div className="disclaimer-callout">
          <p>I&apos;m not a doctor.</p>

          <p>
            This blog includes general discussions about health, fitness, and related subjects. 
            The information and other content provided in this blog, or in any linked materials, 
            are not intended and should not be considered as medical or training advice, nor is 
            the information a substitute for professional medical and/or training expertise and/or treatment.
          </p>

          <p>
            If you or any other person has a medical or fitness concern, you should consult with 
            your health care provider or seek other professional medical treatment. Never disregard 
            professional medical advice or delay in seeking it because of something that have read 
            on this post or in any linked materials.
          </p>

          <p>
            The opinions and views expressed on this blog and website have no relation to those 
            of any academic, hospital, health practice or other institution.
          </p>

          <p>
            The author expressly disclaims responsibility, and shall have no liability, for any 
            damages, loss, injury, or liability whatsoever suffered as a result of your reliance 
            on the information contained in this site.
          </p>
        </div>
      </div>
    </Layout>
  );
}