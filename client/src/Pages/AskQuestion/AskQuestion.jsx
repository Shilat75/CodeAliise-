import React, { useCallback, useEffect, useState } from 'react'
import { ReactTags } from 'react-tag-autocomplete'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [tagsForQuestions, setTagsForQuestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);



  useEffect(() => {
    let tags = [];
    var suggestionFromTitle = suggestions.filter(x => questionTitle?.toLocaleLowerCase().includes(x?.label?.toLowerCase()) && questionTitle != "");
    var suggestionFromDescription = suggestions.filter(x => questionBody?.toLocaleLowerCase().includes(x?.label?.toLowerCase()) && setQuestionBody != "");
    if (suggestionFromTitle?.length)
      tags = tags.concat(suggestionFromTitle);
    if (suggestionFromDescription?.length)
      tags = tags.concat(suggestionFromDescription);

    const _tags = Array.from(
      new Map(tags.map(tag => [tag.label, tag])).values()
    );
    setTagsForQuestions(_tags);

  }, [questionTitle, questionBody])

  const onAdd = useCallback(
    (newTag) => {
      if (tagsForQuestions?.length == 5) {
        alert("Already 5 Tags Added")
        return;
      }
      setTagsForQuestions([...tagsForQuestions, newTag])

    },
    [tagsForQuestions]
  )

  const onDelete = useCallback(
    (index) => {
      setTagsForQuestions(tagsForQuestions.filter((_, i) => i !== index))
    },
    [tagsForQuestions]
  )



  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const tags = useSelector((state) => state.tagsReducer);


  const navigate = useNavigate();

  useEffect(() => {
    var suggestiion = tags?.data?.map((tag) => { return { value: tag._id, label: tag.Name } });
    setSuggestions(suggestiion ?? [])
  }, [tags])

  // const onInput = useCallback(
  //   (key) => {
  //     console.log(key, tags.data)

  //     var suggestiion = key == "" ? [] : tags.data.map((tag) => { return { value: tag._id, label: tag.Name } })?.filter(x => x.label?.toLowerCase()?.includes(key?.toLowerCase()));
  //     console.log(suggestiion)
  //     setSuggestions(suggestiion ?? [])
  //   },
  //   [tags.data]
  // )

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && tagsForQuestions) {
        let questionTags = tagsForQuestions?.map(x => x.label);
        debugger
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: User.result.name,
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              {
                tags?.data?.length ?
                  <ReactTags
                    ariaDescribedBy="async-suggestions-description"
                    id="async-suggestions-demo"
                    labelText="Select characters"
                    noOptionsText={'No characters found'}
                    // onInput={onInput}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    placeholderText="Start typing..."
                    selected={tagsForQuestions}
                    suggestions={suggestions}
                  />
                  : <></>
              }

            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
