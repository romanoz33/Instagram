import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
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

const App = () => <IntercomProvider appId={INTERCOM_APP_ID}>
	    
	<HomePage />
	  
</IntercomProvider>;

const Intercom = ({ ...props
}) => {
	const {
		boot,
		shutdown,
		hardShutdown,
		update,
		hide,
		show,
		showMessages,
		showNewMessages,
		getVisitorId,
		startTour,
		trackEvent
	} = useIntercom(); // const refIndicator = useRef(null);
	// const [progress, setPrigress] = useState(0);

	const bootWithProps = () => boot({
		name: 'Russo'
	});

	const updateWithProps = () => update({
		name: 'Ossur'
	});

	const handleNewMessages = () => showNewMessages();

	const handleNewMessagesWithContent = () => showNewMessages('content');

	const handleGetVisitorId = () => console.log(getVisitorId());

	const handleStartTour = () => startTour(123);

	const handleTrackEvent = () => trackEvent('invited-friend');

	const handleTrackEventWithMetaData = () => trackEvent('invited-frind', {
		name: 'Russo'
	});

	const {
		override,
		rest
	} = useOverrides(props, overrides); // {...override('Wrapper Indicator')}

	return <Box {...rest}>
		<button onClick={boot}>
			Boot intercom
		</button>
		      
		<button onClick={bootWithProps}>
			Boot with props
		</button>
		      
		<button onClick={shutdown}>
			Shutdown
		</button>
		      
		<button onClick={hardShutdown}>
			Hard shutdown
		</button>
		      
		<button onClick={update}>
			Update clean session
		</button>
		      
		<button onClick={updateWithProps}>
			Update session with props
		</button>
		      
		<button onClick={show}>
			Show messages
		</button>
		      
		<button onClick={hide}>
			Hide messages
		</button>
		      
		<button onClick={showMessages}>
			Show message list
		</button>
		      
		<button onClick={handleNewMessages}>
			Show new messages
		</button>
		      
		<button onClick={handleNewMessagesWithContent}>
			        Show new message with pre-filled content
      
		</button>
		      
		<button onClick={handleGetVisitorId}>
			Get visitor id
		</button>
		      
		<button onClick={handleStartTour}>
			Start tour
		</button>
		      
		<button onClick={handleTrackEvent}>
			Track event
		</button>
		      
		<button onClick={handleTrackEventWithMetaData}>
			        Track event with metadata
      
		</button>
	</Box>;
};

Object.assign(Intercom, {
	overrides
});
export default Intercom;