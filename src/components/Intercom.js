import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';
import Intercom from 'react-intercom';
const INTERCOM_APP_ID = 'wkuhiwc5';
const overrides = {
	'Wrapper Indicator': {
		'kind': 'Box',
		'props': {
			'position': 'fixed',
			'top': '0',
			'z-index': '1000',
			'width': '100%',
			'height': '8px',
			'background': 'rgba(179, 179, 179, .7)',
			'min-width': '0',
			'min-height': '0'
		}
	},
	'Indicator': {
		'kind': 'Box',
		'props': {
			'height': '8px',
			'width': '0%',
			'background': 'rgba(76, 89, 175, 1);',
			'min-width': '0',
			'min-height': '0'
		}
	}
};

const Intercom2 = ({ ...props
}) => {
	// const refIndicator = useRef(null);
	// const [progress, setPrigress] = useState(0);
	const user = {
		user_id: appUser.id,
		email: appUser.email,
		name: appUser.name
	};
	const {
		override,
		rest
	} = useOverrides(props, overrides); // {...override('Wrapper Indicator')}

	return <Box {...rest}>
		      
		<Intercom appID="wkuhiwc5" />
		 
	</Box>;
};

Object.assign(Intercom2, {
	overrides
});
export default Intercom2;