import React, { useMemo } from 'react';
import { Box } from '@quarkly/widgets';
import InstagramEmbed from 'react-instagram-embed';

const Counter = ({
	urlProp,
	sizeProp,
	hideCaptionProp,
	...props
}) => {
	const isSmaill = useMemo(() => sizeProp === 'Small', [sizeProp]);
	return <Box {...props}>
		 
      
		<InstagramEmbed
			url={`https://instagr.am/p/${urlProp}/`}
			clientAccessToken='171174804739193|253f5615a16361057dfb8473a825c280'
			maxWidth={isSmaill ? 320 : 658}
			hideCaption={hideCaptionProp}
			containerTagName='div'
		/>
	</Box>;
};

const propInfo = {
	urlProp: {
		title: 'URL Поста',
		description: {
			en: 'Url адрес поста'
		},
		control: 'input',
		category: 'Main',
		weight: 1
	},
	sizeProp: {
		title: 'Size Prop',
		description: {
			en: 'Размер'
		},
		control: 'radio-group',
		variants: ['Small', 'Big'],
		category: 'Main',
		weight: .5
	},
	hideCaptionProp: {
		title: 'Hide Caption',
		description: {
			en: 'Скрыть подпись'
		},
		control: 'checkbox',
		category: 'Main',
		weight: .5
	}
};
const defaultProps = {
	urlProp: 'CNAqpPFjeYi',
	sizeProp: 'Small',
	hideCaptionProp: false
};
Object.assign(Counter, {
	propInfo,
	defaultProps
});
export default Counter;