import 'quill/dist/quill.core.css';
import {createStyles, makeStyles, fade} from '@material-ui/core/styles';

/**
 * Quill Styles
 */
const useQuillStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      '.ql-container': {
        position: 'relative',
        width: '100%',
      },
      '.ql-clipboard': {
        left: -100000,
        height: 1,
        overflowY: 'hidden',
        position: 'absolute',
        top: '50%',
      },
      '.ql-editor': {
        padding: 0,
        outline: 'none',
      },
      '.ql-editor p': {
        margin: 0,
        padding: 0,
      },
      '.ql-editor.ql-blank::before': {
        color: 'currentColor',
        opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shorter,
        }),
        content: 'attr(data-placeholder)',
        pointerEvents: 'none',
        position: 'absolute',
      },
      '.ql-divider': {
        margin: theme.spacing(0.5, 0.5),
        height: `calc(100% - ${theme.spacing(1)}px)`,
      },
      '.ql-active': {
        backgroundColor: `${fade(theme.palette.grey[400], 0.25)} !important`,
      },
    },
  })
);

// DEFAULT EXPORT
export default useQuillStyles;
