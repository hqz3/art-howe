import React from "react";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

const StyledArtworkDetail = styled.div`
  display: flex;
  flex: 25%;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-word;

  #title {
    font-style: italic;
  }

  #artist,
  #year,
  #exhibition,
  #venue,
  #tag {
    cursor: pointer;

    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }

  @media screen and (max-height: 900px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export default function ArtworkDetail({ data }) {
  const { search, view } = useCustomContext();

  let categories = ["artist", "year", "exhibition", "venue", "tag"];
  const handleDetailClick = (e) => {
    if (categories.includes(e.target.id)) {
      let detailText = e.target.innerText;
      // If the detailText is a tag, remove any lingering semicolons
      detailText = detailText.replace("; ", "");
      view.setViewing(view.type.MOSAIC);
      search.setQuery(detailText);
    }
  };

  // Format the tags to include a semicolon after each tag excluding the last tag
  let formattedTags = data.post.tags.edges.map((post, idx) => {
    if (idx === data.post.tags.edges.length - 1) return post.node.name;
    else {
      return post.node.name + "; ";
    }
  });

  return (
    <StyledArtworkDetail
      onClick={handleDetailClick}
      className="custom-scrollbar"
    >
      <div id="artist">{data.post.details.artist?.toUpperCase()}</div>
      <br />
      <div id="title">{data.post.title}</div>
      <div id="year">{data.post.details.year}</div>
      <br />
      <b>Exhibition</b>
      <div id="exhibition">{data.post.details.exhibition}</div>
      <br />
      <b>Venue</b>
      <div id="venue">{data.post.details.venue}</div>
      <br />
      <b>Date Seen</b>
      <div>{data.post.details.dateSeen?.replace(/[/]/g, ".")}</div>
      <br />
      <b>Tags</b>
      <div>
        {formattedTags.map((tag, idx) => (
          <span id="tag" key={idx}>
            {tag}
          </span>
        ))}
      </div>
      <br />
      <b>Hi-res Link</b>
      <a href={data.post.details.link}>{data.post.details.link}</a>
    </StyledArtworkDetail>
  );
}
