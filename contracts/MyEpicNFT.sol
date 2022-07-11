// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

// Primeiro importamos alguns contratos do OpenZeppelin.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// Precisamos importar essa funcao de base64 que acabamos de criar
import {Base64} from "./libraries/Base64.sol";

// Nós herdamos o contrato que importamos. Isso significa que
// teremos acesso aos métodos do contrato herdado.
contract MyEpicNFT is ERC721URIStorage {
    // Mágica dada pelo OpenZeppelin para nos ajudar a observar os tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => uint256) private mintedByUser;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    string private _part1 =
        "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 24 24'><style>text{fill:";
    string private _part2 =
        ";font-family:monospace;font-size:1px;font-style:italic;font-weight:900;}rect{fill:";
    string private _part3 = ";fill-opacity:0.4}svg{background-color:";
    string private _part4 = ";}</style><path fill='";
    string private _part5 =
        "' d='M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z'/><rect x='0' y='22.8' width='24' height='1.3'/><text x='0.2' y='23.8'>#";
    string private _part6 = "</text></svg>";

    string private _part0json = "{\"description\":\"That is the test NFT #";
	string private _part1json = " of svg ";
	string private _part2json = ".:):):)\",\"external_url\":\"https://github.com/AsonCS/epic_nfts\",\"image\":\"";
	string private _part3json = "\",\"name\":\"";
	string private _part4json = "\",\"attributes\":[{\"trait_type\":\"Background\",\"value\":\"";
	string private _part5json = "\"},{\"trait_type\":\"Color\",\"value\":\"";
	string private _part6json = "\"}]}";

    string[] private _colors = [
        "red",
        "blue",
        "green",
        "orange",
        "red",
        "blue",
        "green",
        "orange",
        "red",
        "blue",
        "green",
        "orange"
    ];
    uint256 private _lastColor = 0;
    string[] private _backgroundColors = [
        "black",
        "white",
        "brown",
        "black",
        "white",
        "brown",
        "black",
        "white",
        "brown",
        "black",
        "white",
        "brown"
    ];
    uint256 private _lastBackgroundColor = 0;

    // Nós precisamos passar o nome do nosso token NFT e o símbolo dele.
    constructor() payable ERC721("SvgCollored", "SvgC") {
        // Quero que comece por 1
        _tokenIds.increment();
        // console.log("Esse eh meu contrato de NFT! Tchu-hu");
    }

    function buildSvg(
        string memory color,
        string memory backgroundColor,
        string memory tokenId,
        string memory nftName
    ) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(_part1, color);
        svg = abi.encodePacked(svg, _part2);
        svg = abi.encodePacked(svg, color);
        svg = abi.encodePacked(svg, _part3);
        svg = abi.encodePacked(svg, backgroundColor);
        svg = abi.encodePacked(svg, _part4);
        svg = abi.encodePacked(svg, color);
        svg = abi.encodePacked(svg, _part5);
        svg = abi.encodePacked(svg, tokenId);
        svg = abi.encodePacked(svg, " ");
        svg = abi.encodePacked(svg, nftName);
        svg = abi.encodePacked(svg, _part6);
        // console.log("\n");
        // console.log("\n");
        // console.log(string(svg));
        string memory finalSvg = "data:image/svg+xml;base64,";
        finalSvg = string(abi.encodePacked(finalSvg, Base64.encode(svg)));
        // console.log("\n");
        // console.log("\n");
        // console.log(finalSvg);
        return finalSvg;
    }

    function buildJson(
        string memory color,
        string memory backgroundColor,
        string memory tokenId,
        string memory nftName,
        string memory image
    ) public view returns (string memory) {
        // console.log("\n");
        // console.log("\n");
        // console.log(color, backgroundColor);
        bytes memory json = abi.encodePacked(_part0json, tokenId);
        json = abi.encodePacked(json, _part1json);
        json = abi.encodePacked(json, nftName);
        json = abi.encodePacked(json, _part2json);
        json = abi.encodePacked(json, image);
        json = abi.encodePacked(json, _part3json);
        json = abi.encodePacked(json, nftName);
        json = abi.encodePacked(json, _part4json);
        json = abi.encodePacked(json, backgroundColor);
        json = abi.encodePacked(json, _part5json);
        json = abi.encodePacked(json, color);
        json = abi.encodePacked(json, _part6json);
        // console.log("\n");
        // console.log("\n");
        // console.log(string(json));
        string memory finalJson = "data:application/json;base64,";
        finalJson = string(abi.encodePacked(finalJson, Base64.encode(json)));
        // console.log("\n");
        // console.log("\n");
        // console.log(finalJson);
        return finalJson;
    }

    // Uma função que o nosso usuário irá chamar para pegar sua NFT.
    function makeAnEpicNFT(string memory _nftName) public {
        require(mintedByUser[msg.sender] < 20, "User reached max mint amount");

        // Pega o tokenId atual, que começa por 1.
        uint256 newItemId = _tokenIds.current();

        // Minta ("cunha") o NFT para o sender (quem ativa o contrato) usando msg.sender.
        _safeMint(msg.sender, newItemId);

        uint256 colorIdx = (block.timestamp) % _colors.length;
        if (colorIdx == _lastColor) {
            colorIdx = colorIdx + 1;
            if (colorIdx == _colors.length) {
                colorIdx = 0;
            }
        }
        _lastColor = colorIdx;
        uint256 backgroundColorIdx = (block.timestamp) %
            _backgroundColors.length;
        if (backgroundColorIdx == _lastBackgroundColor) {
            backgroundColorIdx = backgroundColorIdx + 1;
            if (backgroundColorIdx == _backgroundColors.length) {
                backgroundColorIdx = 0;
            }
        }
        _lastBackgroundColor = backgroundColorIdx;
        string memory svg = buildSvg(
            _colors[colorIdx],
            _backgroundColors[backgroundColorIdx],
            Strings.toString(newItemId),
            _nftName
        );
        // pego todos os metadados de JSON e codifico com base64.
        string memory json = buildJson(
            _colors[colorIdx],
            _backgroundColors[backgroundColorIdx],
            Strings.toString(newItemId),
            _nftName,
            svg
        );

        // Designa os dados do NFT.
        _setTokenURI(newItemId, json);
        // console.log(
        //     "Uma NFT com o ID #%s foi mintada para %s",
        //     newItemId,
        //     msg.sender
        // );

        // Incrementa o contador para quando o próximo NFT for mintado.
        _tokenIds.increment();

        mintedByUser[msg.sender] += 1;

        emit NewEpicNFTMinted(msg.sender, newItemId);
    }

    function getMintedByUser() public view returns (uint256) {
        return mintedByUser[msg.sender];
    }
}
