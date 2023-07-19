import { Web3Button } from "@thirdweb-dev/react";

export default function Claim() {
  return (
    <Web3Button
      contractAddress="0x593649F70f836565e33f0BCe9af9503c243359B3"
      action={(contract) => {
        contract.call("claim")
      }}
    >
      Claim
    </Web3Button>
  )
}