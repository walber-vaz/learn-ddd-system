import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';
import { Url } from './url';

describe('Url', () => {
  describe('constructor', () => {
    it('should create a valid Url instance with a valid URL string', () => {
      const validUrl = faker.internet.url();
      const url = new Url(validUrl);

      expect(url.value).toBe(validUrl);
    });

    it('should create a Url instance with empty string when no value is provided', () => {
      expect(() => new Url()).toThrow(ErrorValidation);
    });

    it('should throw ErrorValidation when provided with an invalid URL', () => {
      const invalidUrl = faker.lorem.word();

      expect(() => new Url(invalidUrl)).toThrow(ErrorValidation);
      expect(() => new Url(invalidUrl)).toThrow(
        expect.objectContaining({
          code: Errors.URL_INVALID,
        }),
      );
    });

    it('should throw ErrorValidation when provided with empty string', () => {
      expect(() => new Url('')).toThrow(ErrorValidation);
      expect(() => new Url('')).toThrow(
        expect.objectContaining({
          code: Errors.URL_INVALID,
        }),
      );
    });

    it('should throw ErrorValidation when provided with malformed URLs', () => {
      const malformedUrls = [
        'not-a-url',
        'http://',
        'https://',
        faker.lorem.sentence(),
        '123456',
        'http//example.com',
      ];

      malformedUrls.forEach((invalidUrl) => {
        expect(() => new Url(invalidUrl)).toThrow(ErrorValidation);
      });
    });
  });

  describe('protocol getter', () => {
    it('should return the correct protocol for HTTP URLs', () => {
      const httpUrl = faker.internet.url({ protocol: 'http' });
      const url = new Url(httpUrl);

      expect(url.protocol).toBe('http:');
    });

    it('should return the correct protocol for HTTPS URLs', () => {
      const httpsUrl = faker.internet.url({ protocol: 'https' });
      const url = new Url(httpsUrl);

      expect(url.protocol).toBe('https:');
    });

    it('should return the correct protocol for FTP URLs', () => {
      const ftpUrl = `ftp://${faker.internet.domainName()}`;
      const url = new Url(ftpUrl);

      expect(url.protocol).toBe('ftp:');
    });
  });

  describe('domain getter', () => {
    it('should return the correct domain for URLs', () => {
      const domain = faker.internet.domainName();
      const testUrl = `https://${domain}`;
      const url = new Url(testUrl);

      expect(url.domain).toBe(domain);
    });

    it('should return the correct domain for URLs with subdomains', () => {
      const subdomain = faker.internet.domainWord();
      const domain = faker.internet.domainName();
      const fullDomain = `${subdomain}.${domain}`;
      const testUrl = `https://${fullDomain}`;
      const url = new Url(testUrl);

      expect(url.domain).toBe(fullDomain);
    });

    it('should return the correct domain for URLs with ports', () => {
      const domain = faker.internet.domainName();
      const port = faker.internet.port();
      const testUrl = `https://${domain}:${port}`;
      const url = new Url(testUrl);

      expect(url.domain).toBe(domain);
    });
  });

  describe('path getter', () => {
    it('should return "/" for URLs without path', () => {
      const domain = faker.internet.domainName();
      const testUrl = `https://${domain}`;
      const url = new Url(testUrl);

      expect(url.path).toBe('/');
    });

    it('should return the correct path for URLs with path', () => {
      const domain = faker.internet.domainName();
      const path = `/${faker.system.directoryPath()}`;
      const testUrl = `https://${domain}${path}`;
      const url = new Url(testUrl);

      expect(url.path).toBe(path);
    });

    it('should return the correct path for URLs with multiple path segments', () => {
      const domain = faker.internet.domainName();
      const pathSegments = Array.from({ length: 3 }, () => faker.lorem.word());
      const path = `/${pathSegments.join('/')}`;
      const testUrl = `https://${domain}${path}`;
      const url = new Url(testUrl);

      expect(url.path).toBe(path);
    });

    it('should return the correct path for URLs with file extension', () => {
      const domain = faker.internet.domainName();
      const fileName = faker.system.fileName();
      const path = `/${fileName}`;
      const testUrl = `https://${domain}${path}`;
      const url = new Url(testUrl);

      expect(url.path).toBe(path);
    });
  });

  describe('params getter', () => {
    it('should return empty object for URLs without query parameters', () => {
      const testUrl = faker.internet.url();
      const url = new Url(testUrl);

      expect(url.params).toEqual({ '': undefined });
    });

    it('should return correct params object for URLs with single query parameter', () => {
      const domain = faker.internet.domainName();
      const paramKey = faker.lorem.word();
      const paramValue = faker.lorem.word();
      const testUrl = `https://${domain}?${paramKey}=${paramValue}`;
      const url = new Url(testUrl);

      expect(url.params).toEqual({ [paramKey]: paramValue });
    });

    it('should return correct params object for URLs with multiple query parameters', () => {
      const domain = faker.internet.domainName();
      const param1Key = faker.lorem.word();
      const param1Value = faker.lorem.word();
      const param2Key = faker.lorem.word();
      const param2Value = faker.number.int({ min: 1, max: 100 }).toString();
      const testUrl = `https://${domain}?${param1Key}=${param1Value}&${param2Key}=${param2Value}`;
      const url = new Url(testUrl);

      expect(url.params).toEqual({
        [param1Key]: param1Value,
        [param2Key]: param2Value,
      });
    });

    it('should handle query parameters with special characters', () => {
      const domain = faker.internet.domainName();
      const paramKey = 'search';
      const paramValue = 'hello world';
      const testUrl = `https://${domain}?${paramKey}=${encodeURIComponent(paramValue)}`;
      const url = new Url(testUrl);

      expect(url.params).toEqual({ [paramKey]: 'hello+world' });
    });
  });

  describe('isValid static method', () => {
    it('should return true for valid HTTP URLs', () => {
      const validUrl = faker.internet.url({ protocol: 'http' });
      expect(Url.isValid(validUrl)).toBeTruthy();
    });

    it('should return true for valid HTTPS URLs', () => {
      const validUrl = faker.internet.url({ protocol: 'https' });
      expect(Url.isValid(validUrl)).toBeTruthy();
    });

    it('should return true for valid FTP URLs', () => {
      const ftpUrl = `ftp://${faker.internet.domainName()}`;
      expect(Url.isValid(ftpUrl)).toBeTruthy();
    });

    it('should return true for URLs with ports', () => {
      const domain = faker.internet.domainName();
      const port = faker.internet.port();
      const urlWithPort = `https://${domain}:${port}`;
      expect(Url.isValid(urlWithPort)).toBeTruthy();
    });

    it('should return true for URLs with paths', () => {
      const domain = faker.internet.domainName();
      const path = faker.system.directoryPath();
      const urlWithPath = `https://${domain}/${path}`;
      expect(Url.isValid(urlWithPath)).toBeTruthy();
    });

    it('should return true for URLs with query parameters', () => {
      const domain = faker.internet.domainName();
      const param = faker.lorem.word();
      const value = faker.lorem.word();
      const urlWithQuery = `https://${domain}?${param}=${value}`;
      expect(Url.isValid(urlWithQuery)).toBeTruthy();
    });

    it('should return false for invalid URLs', () => {
      const invalidUrls = [
        '',
        'not-a-url',
        'http://',
        'https://',
        faker.lorem.sentence(),
        '123456',
        'http//example.com',
      ];

      invalidUrls.forEach((invalidUrl) => {
        expect(Url.isValid(invalidUrl)).toBeFalsy();
      });
    });

    it('should return true for URLs that are technically valid but might seem invalid', () => {
      const technicallyValidUrls = [
        'ftp:/invalid',
        'mailto:',
        'https:example.com',
      ];

      technicallyValidUrls.forEach((validUrl) => {
        expect(Url.isValid(validUrl)).toBeTruthy();
      });
    });

    it('should return false for null and undefined', () => {
      // @ts-expect-error - Testing invalid input types
      expect(Url.isValid(null)).toBeFalsy();
      // @ts-expect-error - Testing invalid input types
      expect(Url.isValid(undefined)).toBeFalsy();
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with localhost', () => {
      const port = faker.internet.port();
      const localhostUrl = `http://localhost:${port}`;
      const url = new Url(localhostUrl);

      expect(url.domain).toBe('localhost');
      expect(url.protocol).toBe('http:');
    });

    it('should handle URLs with IP addresses', () => {
      const ip = '192.168.1.1';
      const ipUrl = `http://${ip}`;
      const url = new Url(ipUrl);

      expect(url.domain).toBe(ip);
      expect(url.protocol).toBe('http:');
    });

    it('should handle URLs with fragments', () => {
      const domain = faker.internet.domainName();
      const fragment = faker.lorem.word();
      const urlWithFragment = `https://${domain}#${fragment}`;
      const url = new Url(urlWithFragment);

      expect(url.domain).toBe(domain);
      expect(url.protocol).toBe('https:');
    });

    it('should handle complex URLs with all components', () => {
      const subdomain = faker.internet.domainWord();
      const domain = faker.internet.domainName();
      const port = faker.internet.port();
      const path = faker.system.directoryPath();
      const paramKey = faker.lorem.word();
      const paramValue = faker.lorem.word();
      const fragment = faker.lorem.word();

      const complexUrl = `https://${subdomain}.${domain}:${port}/${path}?${paramKey}=${paramValue}#${fragment}`;
      const url = new Url(complexUrl);

      expect(url.domain).toBe(`${subdomain}.${domain}`);
      expect(url.protocol).toBe('https:');
      expect(url.path).toBe(`/${path}`);
      expect(url.params).toEqual({ [paramKey]: paramValue });
    });
  });
});
