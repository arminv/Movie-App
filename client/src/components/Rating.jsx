import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const RatingStars = ({ voteAverage }) => {
  return (
    <div>
      <Box component='fieldset' mb={3} borderColor='transparent'>
        {voteAverage ? (
          <Rating
            name='read-only'
            value={voteAverage / 2}
            readOnly
            precision={0.5}
          />
        ) : (
          ''
        )}
      </Box>
    </div>
  );
};

export default RatingStars;
