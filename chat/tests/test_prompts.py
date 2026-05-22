"""
Testes para chat.prompts.

Garante que os prompts de sistema estejam presentes, sejam strings não-vazias
e contenham os elementos essenciais para o comportamento correto do Herbert.
"""

import pytest
from chat.prompts import PRODUCT_EXTRACTION_PROMPT, SYSTEM_PROMPT


class TestSystemPrompt:
    def test_system_prompt_is_a_string(self):
        assert isinstance(SYSTEM_PROMPT, str)

    def test_system_prompt_is_not_empty(self):
        assert len(SYSTEM_PROMPT.strip()) > 0

    def test_system_prompt_identifies_assistant_as_herbert(self):
        assert "Herbert" in SYSTEM_PROMPT

    def test_system_prompt_mentions_ajuda_tech(self):
        assert "Ajuda Tech" in SYSTEM_PROMPT

    def test_system_prompt_instructs_simple_language(self):
        lower = SYSTEM_PROMPT.lower()
        assert "jargão" in lower or "simples" in lower or "acessível" in lower

    def test_system_prompt_covers_recommendation_guidance(self):
        lower = SYSTEM_PROMPT.lower()
        assert "recomend" in lower


class TestProductExtractionPrompt:
    def test_product_extraction_prompt_is_a_string(self):
        assert isinstance(PRODUCT_EXTRACTION_PROMPT, str)

    def test_product_extraction_prompt_is_not_empty(self):
        assert len(PRODUCT_EXTRACTION_PROMPT.strip()) > 0

    def test_extraction_prompt_requests_three_products(self):
        assert "3" in PRODUCT_EXTRACTION_PROMPT or "três" in PRODUCT_EXTRACTION_PROMPT.lower()

    def test_extraction_prompt_defines_budget_option(self):
        assert "budget" in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_defines_ideal_option(self):
        assert "ideal" in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_defines_premium_option(self):
        assert "premium" in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_requests_json_format(self):
        lower = PRODUCT_EXTRACTION_PROMPT.lower()
        assert "json" in lower

    def test_extraction_prompt_specifies_name_field(self):
        assert '"name"' in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_specifies_price_field(self):
        assert '"price"' in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_specifies_type_field(self):
        assert '"type"' in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_specifies_justification_field(self):
        assert '"justification"' in PRODUCT_EXTRACTION_PROMPT

    def test_extraction_prompt_instructs_json_only_output(self):
        lower = PRODUCT_EXTRACTION_PROMPT.lower()
        # O prompt deve pedir que a IA retorne APENAS o JSON, sem texto extra
        assert "apenas" in lower or "somente" in lower or "only" in lower
