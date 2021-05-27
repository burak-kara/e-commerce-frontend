// import React from 'react';
import { connect, /* useStore, */ } from 'react-redux';
import { openAlert } from '../../_redux/actions';


const CreateCampaign = (params) => {
    console.log(params);
};

export default connect(null, { openAlert })(CreateCampaign);