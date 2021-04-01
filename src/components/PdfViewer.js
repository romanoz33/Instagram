import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Button, Text } from '@quarkly/widgets';
import atomize from "@quarkly/atomize";
import { usePdf } from 'react-pdf-js';
const overrides = {
	'Button Box': {
		'kind': 'Box',
		'props': {
			'display': 'flex',
			'justify-content': 'center'
		}
	},
	'Button': {
		'kind': 'Button',
		'props': {
			'width': '100px',
			'margin': '10px',
			'fonst-size': '18px'
		}
	},
	'Button :Disabled': {
		'kind': 'Button',
		'props': {
			'opacity': '.5'
		}
	}
};
const Canvas = atomize.canvas();

const PDFViewer = ({
	urlPDFFileProp,
	defaultPageProp,
	scaleProp,
	typeProp,
	...props
}) => {
	const [page, setPage] = useState(parseInt(defaultPageProp));
	const [pages, setPages] = useState(null);
	const canvasEl = useRef(null);
	const typeView = useMemo(() => {
		switch (typeProp) {
			case 'upward':
				return 0;
				break;

			case 'downward':
				return 180;
				break;

			case 'leftward':
				return 270;
				break;

			default:
				return 90;
		}

		;
	}, [typeProp]);
	const viewPrevPage = useCallback(() => {
		if (page <= 1) return;
		setPage(page - 1);
	}, [page]);
	const viewNextPage = useCallback(() => {
		if (page === pages) return;
		setPage(page + 1);
	}, [page]);
	useEffect(() => {
		setPages(numPages);
	}, []);
	useEffect(() => {
		setPage(parseInt(defaultPageProp));
	}, [defaultPageProp]);
	const [loading, numPages] = usePdf({
		file: urlPDFFileProp,
		page: page < 1 || page > pages ? 1 : page,
		canvasEl,
		scale: parseFloat(scaleProp),
		rotate: typeView
	});
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const textLoading = <Text>
		Loading...
	</Text>;
	const pagination = <Box {...override('Button Box')}>
		  
		<Button {...override('Button', page <= 1 && 'Button :Disabled')} onClick={viewPrevPage}>
			Previous
		</Button>
		<Button {...override('Button', page === pages && 'Button :Disabled')} onClick={viewNextPage}>
			Next
		</Button>
	</Box>;
	return <Box text-align='center' {...rest}>
		      
		<Canvas ref={canvasEl} />
		      
		{loading ? textLoading : pagination}
		 
	</Box>;
};

const propInfo = {
	urlPDFFileProp: {
		title: 'URL-link PDF File',
		description: {
			en: 'Ссылка на PDF файл'
		},
		control: 'input',
		category: 'Main',
		weight: 1
	},
	defaultPageProp: {
		title: 'Default Page',
		description: {
			en: 'Страница по умолчанию'
		},
		control: 'input',
		category: 'Main',
		weight: .5
	},
	scaleProp: {
		title: 'Scale View PDF',
		description: {
			en: 'Масштаб отображения'
		},
		control: 'input',
		variants: ['0.5', '1', '1.5', '2'],
		category: 'Main',
		weight: .5
	},
	typeProp: {
		title: 'Type View PDF',
		description: {
			en: 'Тип отображения'
		},
		control: 'select',
		variants: ['upward', 'downward', 'leftward', 'rightward'],
		category: 'Main',
		weight: .5
	}
};
const defaultProps = {
	urlPDFFileProp: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/961287/Greenbook_chapter_14a_v7_12Feb2021.pdf',
	defaultPageProp: '1',
	scaleProp: '1',
	typeProp: 'upward'
};
Object.assign(PDFViewer, {
	overrides,
	propInfo,
	defaultProps
});
export default PDFViewer;