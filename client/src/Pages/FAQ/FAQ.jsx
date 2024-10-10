import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFAQs, updateFaqs } from '../../actions/faQuestion';
import '../../App.css';
import './FAQ.css';
import videoSource from './v3.mp4';

const FAQPage = () => {
  const dispatch = useDispatch();
  const { faqs = [], loading, error } = useSelector((state) => state.faqReducer);

  // Fetch FAQs on component mount
  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  // Handler for updating FAQs
  const handleUpdateFAQs = async () => {
    await dispatch(updateFaqs());
    dispatch(fetchFAQs());
  };

  // Function to group similar questions within each cluster
  const groupQuestionsByCategory = (clusters) => {
    const groupedClusters = [];
    clusters.forEach((cluster) => {
      const categoryMap = {};
      cluster.forEach((faq) => {
        const category = faq.question_title;
        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }
        categoryMap[category].push(faq);
      });
      groupedClusters.push(Object.values(categoryMap));
    });
    return groupedClusters;
  };

  const groupedClusters = faqs.clusters ? groupQuestionsByCategory(faqs.clusters) : [];

  return (
    <>

      {/* Background Video */}
      <video className="faq-background-video" autoPlay loop muted>
        <source src={videoSource} autoPlay loop muted type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* FAQ Container */}
      <div className="faq-box">
        <div className="question-details-page">
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error: {error}</h1>}
          {!loading && !error && groupedClusters.length === 0 && <h1>No FAQs available at the moment.</h1>}

          {/* Render FAQ Clusters */}
          {groupedClusters.length > 0 && (
            groupedClusters.map((categoryCluster, index) => (
              <div key={index} className="question-details-container">
                <h3 className="faq-category-title">Category {index + 1}</h3>
                {categoryCluster.map((questions, idx) => (
                  <div key={idx} className="question-details-container-2">
                    <div className="question-body">
                      <h4 className="faq-question-title">{questions[0].question_title}</h4>
                      <ul className="faq-list">
                        {questions.map((faq) => (
                          <li key={faq.question_id} className="faq-item">
                            <div className="faq-details-container-2">
                              <div className="faq-body">
                                <strong className="faq-question">{faq.question_title}:</strong>
                                <span className="faq-answer">{faq.answer}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      {/* Button Container */}
      <div className="question-actions-user button-container">
        <button className="post-ans-btn" onClick={handleUpdateFAQs}>Update FAQs</button>
      </div>
    </>
  );
}

export default FAQPage;
