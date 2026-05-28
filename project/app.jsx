// app.jsx — mounts the design canvas with both variants

const HEIGHT = 4400;

function App() {
  return (
    <DesignCanvas>
      <DCSection id="rf" title="Reaperborn Forge — One-page" subtitle="Two directions: Forge Codex (editorial) and Tactical Dossier (HUD)">
        <DCArtboard id="a" label="A · Forge Codex" width={A_W} height={HEIGHT}>
          <VariantA />
        </DCArtboard>
        <DCArtboard id="b" label="B · Tactical Dossier" width={B_W} height={HEIGHT}>
          <VariantB />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
