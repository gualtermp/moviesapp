import { InfoSectionProps } from "../../types/InfoSectionProps";

import './InfoSection.scss'

export function InfoSection({ title, value }: InfoSectionProps) {
  return (
    <div className='info_section'>
      <span className="field_title">{title}</span>
      <span className="field_value">{value}</span>
    </div>
  );
}
