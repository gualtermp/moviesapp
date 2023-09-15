import { InfoSectionProps } from "../../types/InfoSectionProps";

import './InfoSection.scss'

export function InfoSection({ title, value, specialClass='' }: InfoSectionProps) {
  return (
    <div className={"info_section"}>
      <span className="field_title">{title}</span>
      <span className={`field_value ${specialClass}`}>{value}</span>
    </div>
  );
}
