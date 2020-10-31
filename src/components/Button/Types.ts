export interface IButtonProps {
  click: () => void;
  height: number;
  htmlType: 'button' | 'reset' | 'submit';
  text: string;
  type: string;
  width: number | string;
}
