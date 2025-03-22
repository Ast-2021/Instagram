import PropTypes from "prop-types";


const PostImage = ({ image }) => (
    <div className="post-image">
        <img src={image} alt="post" />
    </div>
);

PostImage.propTypes = {
    image: PropTypes.string,
}

export default PostImage;
