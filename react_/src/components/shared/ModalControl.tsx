import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from "react";

interface ModalControlProps {
    isOpen: boolean;
    width?: string;
    renderInputForm: () => JSX.Element | null; 
    onClose: (value: boolean) => void; // onCloseが関数であることを示します
}
//ModalControl コンポーネントの定義
const ModalControl: React.FC<ModalControlProps> = ({ isOpen, width="80%", renderInputForm, onClose }) => {
    
    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >

            <Box
                sx={{
                    width: width,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 12,
                    p: 4,
                    overflow: 'auto',
                    position: 'relative', 
                    maxHeight: '85vh', 
                }}
            >
                <IconButton
                    onClick={() => onClose(false)}
                    aria-label="close"
                    style={{
                        position: 'absolute',
                        top: 8, 
                        right: 8,
                        color: 'grey',
                    }}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
                <div>
                    {renderInputForm()}
                </div>
            </Box>

        </Modal>

    );
};

export default ModalControl;
