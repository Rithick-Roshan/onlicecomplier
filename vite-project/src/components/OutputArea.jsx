import React from 'react';

export default function OutputArea({ rs, err }) {
  console.log(rs);
  const outputLines = rs ? (Array.isArray(rs) ? rs : rs.split("\n")) : [];

  return (
    <div className='output-area'>
      <h3>Output: </h3>
      {err ? (
        <p className="red" style={{ color: "red" }}>{rs}</p>
      ) : (
        outputLines.map((line, index) => (
          <p className="green" style={{ color: "green" }} key={index}>
            {line}
          </p>
        ))
      )}
    </div>
  );
}
