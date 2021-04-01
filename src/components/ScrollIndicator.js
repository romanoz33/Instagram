import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';
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

const ScrollIndicator = ({ ...props
}) => {
	const refIndicator = useRef(null);
	const [progress, setPrigress] = useState(0);
	const onScroll = useCallback(() => {
		const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = windowScroll / height * 100;
		setPrigress(scrolled);
	}, [refIndicator.current]);
	useEffect(() => {
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [refIndicator.current]);
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	return <Box {...rest} {...override('Wrapper Indicator')}>
		<Box ref={refIndicator} {...override('Indicator')} width={`${progress}%`}></Box>
	</Box>;
};

Object.assign(ScrollIndicator, {
	overrides
});
export default ScrollIndicator;