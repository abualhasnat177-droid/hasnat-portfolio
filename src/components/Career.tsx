import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer</h4>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Crafting high-quality front-end experiences that enhance
              usability, engagement, and performance across modern web
              platforms.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Front-End Projects</h4>
                <h5>Portfolio Work</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Developed multiple websites including Coffee Shop, Cureva
              Healthcare, and Bizgen Business platforms. Focused on responsive
              design, modern UI, and smooth user experience. Deployed projects
              using Netlify.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital & E-commerce Experience</h4>
                <h5>Shopify · Meta Ads </h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Managed Facebook and Instagram ad campaigns and worked on a
              Shopify store. Gained experience in digital marketing, audience
              targeting, and performance optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
