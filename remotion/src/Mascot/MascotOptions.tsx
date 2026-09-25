import { AbsoluteFill } from "remotion";
import { BagMascot } from "./BagMascot";
import { BagMascotStyled } from "./BagMascotStyled";
import { HoodieBlob } from "./HoodieBlob";
import { ParcelMascot } from "./ParcelMascot";
import { bodyFontFamily } from "../fonts";

const Cell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    }}
  >
    <div style={{ width: 260, height: 260 }}>{children}</div>
    <div
      style={{
        marginTop: 12,
        fontFamily: bodyFontFamily,
        fontWeight: 800,
        fontSize: 30,
        color: "#16161A",
        backgroundColor: "#FFE066",
        padding: "8px 20px",
        borderRadius: 12,
      }}
    >
      {label}
    </div>
  </div>
);

// A 2x2 comparison sheet of mascot concepts, all in the "cheer" pose, for
// a quick side-by-side pick.
export const MascotOptions: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF8E7" }}>
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "6px solid #16161A",
          borderRadius: 40,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          padding: "110px 60px 90px",
        }}
      >
        <Cell label="A · Túi gốc">
          <BagMascot expression="cheer" />
        </Cell>
        <Cell label="B · Túi phụ kiện">
          <BagMascotStyled expression="cheer" />
        </Cell>
        <Cell label="C · Blob áo hoodie">
          <HoodieBlob expression="cheer" />
        </Cell>
        <Cell label="D · Hộp hàng">
          <ParcelMascot expression="cheer" />
        </Cell>
      </div>
    </AbsoluteFill>
  );
};
