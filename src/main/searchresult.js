// SearchComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/serverurl';
import { Link, useParams } from 'react-router-dom';

function SearchComponent() {
  const [searchResults, setSearchResults] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/${keyword}`);
        console.log('response값:',response);
        setSearchResults(response.data.htmlItems); // 'htmlitems' 대신 'htmlItems'로 수정
        // setSearchResults(response.data.htmlItems);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [keyword]);

  const renderFirstImage = (imgUrls) => {
    if (!imgUrls) return null;

    const imageUrlsArray = imgUrls.split(',');
    return <img src={imageUrlsArray[0].trim()} alt="First Image" />;
  };

  return (
    <div id='searchresult_main'>
      <div id="searchresult_container">
        <ul id="searchresult_ul">
          <div id="searchresult_title">
            <h2>게시물 검색 결과</h2>
          </div>
          <div id='searchresult_boxmain'>
            {searchResults.length > 0 &&
              searchResults.map((result) => (
                <Link to={`/htmlboard`} key={result.id}>
                  
                  <li>
                    <div id="searchresult_box">
                      {renderFirstImage(result.img_url)}
                      <div id="searchresult_detail">
                        <p id="searchresult_p">
                          <b>{result.title}</b>
                          <b>{result.content}</b>
                        </p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            {searchResults.length === 0 && (
              <div id="searchresult_title">
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default SearchComponent;
