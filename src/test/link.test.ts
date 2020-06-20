import { expect } from 'chai';
import { parseFigmaLink } from '../ts/domain/deeplink/link';

describe('testDeeplinks', function() {
    it('hasNode', function() {
        const url = "https://www.figma.com/file/KT2x6Q6aPE28dZPMyDV3ba/Wireframing-in-Figma?node-id=0%3A1"

        const result = parseFigmaLink(url)
        expect(result.nodeID).eq("0:1")
    });

    it('noNode', function() {
        const url = "https://www.figma.com/file/KT2x6Q6aPE28dZPMyDV3ba/Wireframing-in-Figma"

        const result = parseFigmaLink(url)
        expect(result).eq(null)
    });
});