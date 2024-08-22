import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <div style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'black',
        color: 'white',
        padding: '5px',
        borderRadius: '3px',
        zIndex: 1,
      }}>
        {content}
      </div>
    </div>
  );
};

const InteractiveText = ({ text, corrections, improvements }) => {
  const [currentText, setCurrentText] = useState(text);

  const handleReplace = (start, end, replacement) => {
    setCurrentText(
      currentText.substring(0, start) +
      replacement +
      currentText.substring(end)
    );
  };

  const renderText = () => {
    let result = [];
    let lastIndex = 0;

    [...corrections, ...improvements].sort((a, b) => a.start - b.start).forEach((item) => {
      if (item.start > lastIndex) {
        result.push(currentText.substring(lastIndex, item.start));
      }

      const content = item.type === 'correction' ? (
        <>
          <span>Correction: {item.suggestion}</span>
          <button onClick={() => handleReplace(item.start, item.end, item.suggestion)}>Replace</button>
        </>
      ) : (
        <>
          <span>Improvement: {item.suggestion}</span>
          <button onClick={() => handleReplace(item.start, item.end, item.suggestion)}>Apply</button>
        </>
      );

      result.push(
        <Tooltip key={item.start} content={content}>
          <span
            style={{
              textDecoration: 'underline',
              textDecorationStyle: item.type === 'correction' ? 'wavy' : 'dotted',
              textDecorationColor: item.type === 'correction' ? 'red' : 'blue',
              cursor: 'pointer',
            }}
          >
            {currentText.substring(item.start, item.end)}
          </span>
        </Tooltip>
      );

      lastIndex = item.end;
    });

    if (lastIndex < currentText.length) {
      result.push(currentText.substring(lastIndex));
    }

    return result;
  };

  return <div>{renderText()}</div>;
};

export default InteractiveText;