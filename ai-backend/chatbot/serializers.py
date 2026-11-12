from rest_framework import serializers


class ChatHistoryItemSerializer(serializers.Serializer):
    role = serializers.ChoiceField(
        choices=["user", "assistant"]
    )
    text = serializers.CharField(
        max_length=2000,
        allow_blank=False
    )


class ChatRequestSerializer(serializers.Serializer):

    """Validates messages before sending request to AI to prevent wastage

    Args:
        message (charfield): _message that the user wishes to send to the AI chatbot_
    """

    message = serializers.CharField(
        max_length=500,
        trim_whitespace=True,
        allow_blank=False,
    )

    history = ChatHistoryItemSerializer(
        many=True,
        required=False,
        max_length=10
    )
