/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageUploader from 'quill-image-uploader';
import { Quill } from 'react-quill';

Quill.register('modules/imageUploader', ImageUploader);

export const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // [{ font: [] }],
    [{ align: [] }],
    // ['link', 'image', 'video'],
    ['link'],
    [{ color: [] }],
  ],
  // imageUploader: {
  //   upload: async (file: File) => {
  //     const reader = new FileReader();
  //     return new Promise((resolve) => {
  //       fetcher<BaseResponse<LogoInfo>>({
  //         url: '/v1/media/upload-image',
  //         method: HTTPMethod.POST,
  //         data: {
  //           file: reader.readAsBinaryString(file),
  //         },
  //       })
  //         .then((response) => {
  //           resolve(response.data?.originUrl);
  //         })
  //         .catch(() => {
  //           notification.error({
  //             message: `Có lỗi khi upload ảnh`,
  //           });
  //         });
  //     });
  //   },
  // },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    displaySize: true,
  },
};
const ParchmentEmbed: any = Quill.import('blots/block/embed');
const BaseImageFormat: any = Quill.import('formats/image');
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style', 'margin'];

export class ImageWithStyle extends ParchmentEmbed {
  static create = (value: unknown) => {
    const node = super.create(value);
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value));
    }
    return node;
  };

  static formats = (domNode: { hasAttribute: (arg0: string) => never; getAttribute: (arg0: string) => never }) => {
    return ImageFormatAttributesList.reduce(
      (formats, attribute) => {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      },
      {} as { [attribute: string]: never },
    );
  };

  static match = (url: string) => {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  };

  static sanitize = (url: string) => {
    return url;
  };

  static value(domNode: { getAttribute: (arg0: string) => never }) {
    return domNode.getAttribute('src');
  }

  format(name: string, value: unknown) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

ImageWithStyle.blotName = 'imagewithstyle';
ImageWithStyle.tagName ? (ImageWithStyle.tagName = 'img') : undefined;

export class ImageFormat extends BaseImageFormat {}

declare global {
  interface Window {
    Quill: any;
  }
}
